'use strict'

const CacheModel = require('./../models/Cache')
const httpErrors = require('http-errors')
const logger = require('./../service/logger')

function getAll(req, res, next) {
    res.json({
        test: true,
    })
}

function deleteAll(req, res, next) {
    logger.error('TODO!!!')
}

function getByKey(req, res, next) {
    logger.error('TODO!!!')
}

function updateByKey(req, res, next) {
    logger.error('TODO!!!')
}

function deleteByKey(req, res, next) {
    logger.error('TODO!!!')
}

// Exports
module.exports.getAll = getAll
module.exports.deleteAll = deleteAll
module.exports.getByKey = getByKey
module.exports.updateByKey = updateByKey
module.exports.deleteByKey = deleteByKey