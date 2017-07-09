'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CacheSchema = new Schema({
    key: {
        type: String,
        required: true,
        min: 1,
        max: 100,
    },
    data: {
        type: String,
        required: true,
        min: 1,
        max: 1000,
    },
    TTL: {
        type: Date, // TODO: !!!
    },
})

CacheSchema.statics.findByKey = function(key = '') {
    return this.find({key: key})
}