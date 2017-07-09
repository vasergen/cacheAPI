'use strict'

const Promise = require('bluebird')
const mongoose = require('mongoose')
const logger = require('./logger')
Promise.promisifyAll(mongoose)
mongoose.Promise = Promise

function connect() {
    const host = 'localhost'
    const port = 27017
    const database = 'cache'
    const uri = `mongodb://${host}:${port}/${database}`

    return mongoose.connect(uri)
        .then(() => {
            logger.info('Successfully connected to database! uri: %s', uri)
        })
}

function disconnect() {
    return mongoose.disconnect()
        .then(() => {
            logger.info('Successfully disconnected')
        })
}

module.exports.connect = connect
module.exports.disconnect = disconnect
