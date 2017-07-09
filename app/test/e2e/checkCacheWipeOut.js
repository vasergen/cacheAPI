'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

const request = require('supertest')
const expect = require('expect')
const server = require('./../../server')
const CacheModel = require('./../../models/Cache')

describe('# Cache Wipe out', () => {
    before(server.start)
    beforeEach(() => {
        return CacheModel.remove({}).then(() => {
            const caches = [1, 2, 3, 4].map((item) => {
                return new CacheModel({
                    key: item,
                    data: item,
                })
            })

            const saveAll = caches.map((cache) => {
                return cache.save()
            })

            return Promise.all(saveAll)
        })
    })
    after(server.stop)

    it('should not do cache wipe out', (done) => {
        request(server.app)
            .get('/cache/5')
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }

                CacheModel.count()
                    .then((count) => {
                        expect(count).toEqual(5)
                        done()
                    })
                    .catch(done)
            })
    })

    it('should do cache wipe out', (done) => {
        request(server.app)
            .get('/cache/5')
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }

                request(server.app).get('/cache/6')
                    .expect(200, () => {
                        CacheModel.count()
                            .then((count) => {
                                expect(count).toEqual(4)
                                done()
                            })
                            .catch(done)
                    })
            })
    })
})
