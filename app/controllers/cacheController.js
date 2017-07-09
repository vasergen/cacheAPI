'use strict'

const CacheModel = require('./../models/Cache')
const httpErrors = require('http-errors')
const logger = require('./../service/logger')
const randomString = require('./../helpers/randomString')

/**
 * Return all keys for cache
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
function getAllKeys(req, res, next) {
    CacheModel.find({})
        .then((data) => {
            const keys = data.map((item) => item.key)
            return res.json({
                data: keys,
            })
        })
        .catch(next)
}

/**
 * Remove all cache
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function deleteAll(req, res, next) {
    CacheModel.remove({})
        .then((responce) => {
            return res.json({
                data: responce,
            })
        })
        .catch(next)
}

/**
 * Get cache by key
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function getByKey(req, res, next) {
    const {key} = req.params
    CacheModel.findByKey(key)
        .then((data) => {
            if (data) {
                logger.info('Cache hit')
                return CacheModel.updateByKey(key, data) // update TTL
            }

            logger.info('Cache miss')
            const cache = new CacheModel({
                key: key,
                data: randomString(),
            })

            const error = cache.validateSync() // validate
            if (error) {
                return next(new httpErrors.BadRequest(error.message))
            }

            return cache.save() // save
        })
        .then((cache) => {
            return res.json({
                data: cache.data,
            })
        })
        .catch(next)
}

/**
 * Update cache by key
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {json}
 */
function updateByKey(req, res, next) {
    const {key} = req.params
    const {data} = req.body

    const cache = new CacheModel({
        key: key,
        data: data,
    })

    const error = cache.validateSync()
    if (error) {
        return next(new httpErrors.BadRequest(error.message))
    }

    CacheModel
        .updateByKey(key, cache.toObject())
        .then((cache) => {
            return res.json({
                data: cache.data,
            })
        })
        .catch(next)
}

/**
 * Delete cache by key
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function deleteByKey(req, res, next) {
    const {key} = req.params
    CacheModel.remove({key: key})
        .then((responce) => {
            res.json({
                data: responce,
            })
        })
        .catch(next)
}

// Exports
module.exports.getAllKeys = getAllKeys
module.exports.deleteAll = deleteAll
module.exports.getByKey = getByKey
module.exports.updateByKey = updateByKey
module.exports.deleteByKey = deleteByKey