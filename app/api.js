'use strict'

const logger = require('./service/logger')
const server = require('./server')
logger.info('START API ...')

server.start()
    .then(() => {
        logger.info('API STARTED SUCCESSFULLY')
    })
    .catch((err) => {
        logger.error(err)
    })
