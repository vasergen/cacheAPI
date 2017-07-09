'use strict'

const CacheModel = require('./../models/Cache')
const httpErrors = require('http-errors')
const logger = require('./../service/logger')
const randomString = require('./../helpers/randomString')

function getAll(req, res, next) {
    CacheModel.find({})
        .then((data) => {
            return res.json(data)
        })
        .catch(next)
}

function deleteAll(req, res, next) {
    CacheModel.remove({})
        .then((responce) => {
            return res.json(responce)
        })
        .catch(next)
}

function getByKey(req, res, next) {
    const {key} = req.params
    CacheModel.findByKey(key)
        .then((data) => {
            if (data) {
                logger.info('Cache hit')
                // TODO: update TTL
                return data
            }

            logger.info('Cache miss')
            const randomStr = randomString()
            const cache = new CacheModel({
                key: key,
                data: randomStr,
                TTL: new Date(),
            })

            return cache.save()
        })
        .then((cache) => {
            return res.json({
                data: cache.data,
            })
        })
        .catch(next)
}

function updateByKey(req, res, next) {
    const {key} = req.params
    const {data} = req.body

    const cache = new CacheModel({
        key: key,
        data: data,
        TTL: new Date(),
    })

    const error = cache.validateSync()
    if (error) {
        return next(new httpErrors.BadRequest(error.message))
    }

    const cacheObj = cache.toObject()
    delete cacheObj._id

    return CacheModel
        .findOneAndUpdate({key: key}, cacheObj, {upsert: true, new: true})
        .then((cache) => {
            return res.json({
                data: cache.data,
            })
        })
        .catch(next)
}

function deleteByKey(req, res, next) {
    const {key} = req.params
    return CacheModel.remove({key: key})
        .then((responce) => {
            res.json({
                data: responce,
            })
        })
        .catch(next)
}

// Exports
module.exports.getAll = getAll
module.exports.deleteAll = deleteAll
module.exports.getByKey = getByKey
module.exports.updateByKey = updateByKey
module.exports.deleteByKey = deleteByKey