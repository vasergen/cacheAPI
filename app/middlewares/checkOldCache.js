'use strict'

const config = require('config')
const {maxItemCount, whipeCount} = config.get('cache')
const CacheModel = require('./../models/Cache')
const logger = require('./../service/logger')

/**
 * Check old cache middleware, exec checkOldCache only when reqCheckNum % whipeCount == 0
 * This is done like that to not do this opeartion every request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkOldCache(req, res, next) {
    const reqCheckNum = req.app.get('reqCheckNum') || 1
    req.app.set('reqCheckNum', reqCheckNum + 1)

    logger.info('reqCheckNum %s', reqCheckNum)

    if (reqCheckNum % whipeCount !== 0) {
        return next()
    }

    CacheModel.checkOldCache(maxItemCount)
        .then(() => {
            return next()
        })
        .catch(next)
}

module.exports = checkOldCache