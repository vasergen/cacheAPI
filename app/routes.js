'use strict'

const express = require('express')
const apiRoutes = express.Router()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/errorHandler')
const cacheController = require('./controllers/cacheController')

// Common Middlewares
apiRoutes.use(morgan('common'))
apiRoutes.use(bodyParser.urlencoded({extended: true}))
apiRoutes.use(bodyParser.json())

// Routes
apiRoutes.get('/cache', cacheController.getAllKeys)
apiRoutes.delete('/cache', cacheController.deleteAll)

apiRoutes.get('/cache/:key', cacheController.getByKey)
apiRoutes.put('/cache/:key', cacheController.updateByKey)
apiRoutes.delete('/cache/:key', cacheController.deleteByKey)

// Eror Handling
apiRoutes.use(errorHandler)

module.exports = apiRoutes
