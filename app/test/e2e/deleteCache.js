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

            return cacheA.save()
        })
    })
    after(server.stop)

    it('shold remove all cache', (done) => {
        request(server.app).delete('/cache')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }

                CacheModel.count().then((count) => {
                    expect(count).toEqual(0)
                })

                done()
            })
    })
})
