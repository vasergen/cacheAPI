'use strict'

const config = require('config')
const {maxItemCount} = config.get('cache')
const CacheModel = require('./../models/Cache')

function checkOldCache(req, res, next) {
    CacheModel.checkOldCache(maxItemCount)
        .then(() => {
            return next()
        })
        .catch(next)
}

module.exports = checkOldCache