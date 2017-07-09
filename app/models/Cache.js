'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('config')
const cacheConfig = config.get('cache')

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

CacheSchema.statics.findByKey = function(key = '') {
    return this.findOne({key: key})
}

CacheSchema.statics.updateByKey = function(key = '', data) {
    delete data._id
    data.TTL = getTTL()
    return this.findOneAndUpdate({key: key}, data, {upsert: true, new: true})
}

const CacheModel = mongoose.model('Cache', CacheSchema)

function getTTL() {
    const {ttlMS} = cacheConfig
    const now = new Date()
    return new Date(now.getTime() + Number.parseInt(ttlMS))
}

module.exports = CacheModel
