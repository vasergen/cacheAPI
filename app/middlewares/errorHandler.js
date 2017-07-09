'use strict'

const logger = require('./../service/logger')

function errorHandler(err, req, res, next) {
    const errorRes = {
        status: err.status || 500,
        message: err.message || 'Error! Server error',
    }

    if (errorRes.status === 500) {
        logger.error(err)
    }
    logger.error(errorRes.message)
    return res.status(errorRes.status).json(errorRes)
}

module.exports = errorHandler