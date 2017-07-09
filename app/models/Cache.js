'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('config')
const logger = require('./../service/logger')

const CacheSchema = new Schema({
    key: {
        type: String,
        required: true,
        min: 1,
        max: 100,
    },
    data: {
        type: String,
        required: true,
        min: 1,
        max: 1000,
    },
    TTL: {
        type: Date,
        required: true,
        default: getTTL,
    },
})

CacheSchema.statics.findByKey = function(key) {
    return this.findOne({key: key})
}

CacheSchema.statics.updateByKey = function(key, data) {
    delete data._id
    data.TTL = getTTL()
    return Promise.resolve()
        .then(() => {
            const {maxItemCount} = config.get('cache')
            return this.checkOldCache(maxItemCount)
        })
        .then(() => {
            return this.findOneAndUpdate(
                {key: key}, data, {upsert: true, new: true}
            )
        })
}

CacheSchema.statics.checkOldCache = function(count) {
    this.count({})
        .then((cacheCount) => {
            logger.info('checkOldCache, cacheCount: %s maxCount: %s', cacheCount, count)
            if (+cacheCount >= +count) {
                const countToDelete = Math.ceil(count * 0.1) // get 10%
                return this.dropOldCache(countToDelete)
            }
        })
}

CacheSchema.statics.dropOldCache = function(count) {
    this.find({})
        .sort({TTL: 1})
        .limit(count)
        .then((data) => {
            const ids = data.map((item) => item._id)
            logger.info('remove ids %s', ids)
            return this.remove({_id: {$in: ids}})
        })
}

CacheSchema.methods.isTTLExided = function() {
    const now = new Date()
    const ttl = new Date(this.TTL)
    return now.getTime() > ttl.getTime()
}

const CacheModel = mongoose.model('Cache', CacheSchema)

function getTTL() {
    const {ttlMS} = config.get('cache')
    const now = new Date()
    return new Date(now.getTime() + Number.parseInt(ttlMS))
}

module.exports = CacheModel
