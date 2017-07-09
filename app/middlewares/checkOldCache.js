'use strict'

const config = require('config')
const {maxItemCount} = config.get('cache')
const CacheModel = require('./../models/Cache')

/**
 * Cache Wipe OUT
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function cachePartialWipeOut(req, res, next) {
    CacheModel.checkOldCache(maxItemCount)
        .then(() => {
            return next()
        })
        .catch(next)
}

module.exports = cachePartialWipeOut