'use strict'

function getRandomString() {
    return 'random_' + Math.random().toString(36).substring(2)
}

module.exports = getRandomString