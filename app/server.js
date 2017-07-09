'use strict'

const express = require('express')
const app = express()
const logger = require('./service/logger')
const mongo = require('./service/mongo')
const appRoutes = require('./routes')
const config = require('config')
const blubird = require('bluebird')
blubird.promisify(app.listen)
const port = config.get('port') || 3000
let server

app.use(appRoutes)

const start = () => {
    return Promise.resolve()
        .then(() => {
            return mongo.connect()
        })
        .then(() => {
            return app.listen(port)
        })
        .then((httpServ) => {
            logger.info('App listening on port %s!', port)
            server = httpServ
        })
}

const stop = () => {
    return Promise.resolve()
        .then(() => {
            return mongo.disconnect()
        })
        .then(() => {
            return server.close()
        })
}

module.exports = {
    app,
    start,
    stop,
}