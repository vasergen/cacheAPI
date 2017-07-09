'use strict'

const express = require('express')
const app = express()
const logger = require('./service/logger')
const mongo = require('./service/mongo')
const appRoutes = require('./routes')
const config = require('config')
const blubird = require('bluebird')
blubird.promisify(app.listen)

app.use(appRoutes)

const start = () => {
    return Promise.resolve()
        .then(() => {
            return mongo.connect()
        })
        .then(() => {
            return app.listen(3000) // TODO: move to config
        })
}

module.exports.start = start