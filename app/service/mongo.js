'use strict'

const Promise = require('bluebird')
const mongoose = require('mongoose')
Promise.promisifyAll(mongoose)
mongoose.Promise = Promise

function connect() {
    const host = 'localhost'
    const port = 27017
    const database = 'cache'
    const uri = `mongodb://${host}:${port}/${database}`

    return mongoose.connect(uri)
        .then(() => {
            console.log('Successfully connected to database!')
        })
}

function disconnect() {
    return mongoose.disconnect()
        .then(() => {
            console.log('Successfully disconnected')
        })
}

module.exports.connect = connect