'use strict'

const Promise = require('bluebird')
const mongoose = require('mongoose')
const logger = require('./logger')
const config = require('config')
Promise.promisifyAll(mongoose)
mongoose.Promise = Promise

function connect() {
    const {database, host, port, username, password, authdb} = config.get('db')
    const options = {}

    let uri = `mongodb://${host}:${port}/${database}`
    if (username && password && authdb) {
        uri = `mongodb://${username}:${password}@${host}:${port}/${database}`
        options.auth = {authdb: authdb}
    }

    return mongoose.connect(uri, options)
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
