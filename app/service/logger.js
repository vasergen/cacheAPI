'use strict'

const bunyan = require('bunyan')
const logger = bunyan.createLogger({name: 'app'})

module.exports = logger