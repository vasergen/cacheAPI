'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

const request = require('supertest')
const expect = require('expect')
const server = require('./../../server')
const CacheModel = require('./../../models/Cache')

describe('# GET /cache', () => {
    before(server.start)
    beforeEach(() => {
        return CacheModel.remove({}).then(() =>{
            const cacheA = new CacheModel({
                key: 'a',
                data: 'a',
            })

            const cacheB = new CacheModel({
                key: 'b',
                data: 'b',
            })

            return Promise.all([
                cacheA.save(),
                cacheB.save(),
            ])
        })
    })
    after(server.stop)

    it('shold return cache keys', (done) => {
        let data = null
        request(server.app).get('/cache')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                data = res.body.data
                expect(data).toEqual(['a', 'b'])
                done()
            })
    })
})
