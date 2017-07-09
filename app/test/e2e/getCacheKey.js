'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

const request = require('supertest')
const expect = require('expect')
const server = require('./../../server')
const CacheModel = require('./../../models/Cache')

describe('# GET /cache/key', () => {
    before(server.start)
    beforeEach(() => {
        return CacheModel.remove({})
    })
    after(server.stop)

    it('first get random data, then second time the same', (done) => {
        let data = null
        request(server.app).get('/cache/some_key')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                data = res.body.data
                expect(data).toExist()

                request(server.app).get('/cache/some_key')
                    .expect('Content-Type', /json/)
                    .expect(200, (err, res) => {
                        if (err) {
                            done(err)
                        }

                        expect(res.body.data).toEqual(data)
                        done()
                    })
            })
    })

    it('second time should return random if TTL exided ', (done) => {
        let data = null
        request(server.app).get('/cache/some_key')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                data = res.body.data
                expect(data).toExist()

                setTimeout(() => {
                    request(server.app).get('/cache/some_key')
                        .expect('Content-Type', /json/)
                        .expect(200, (err, res) => {
                            if (err) {
                                done(err)
                            }

                            expect(res.body.data).toNotEqual(data)
                            done()
                        })
                }, 1000) // time should be bigger than in config
            })
    })
})
