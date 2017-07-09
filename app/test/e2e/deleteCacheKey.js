'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

const request = require('supertest')
const expect = require('expect')
const server = require('./../../server')
const CacheModel = require('./../../models/Cache')

describe('# DELETE /cache/key', () => {
    before(server.start)
    beforeEach(() => {
        return CacheModel.remove({}).then(() => {
            const cacheA = new CacheModel({
                key: 'a',
                data: 'a',
            })

            return cacheA.save()
        })
    })
    after(server.stop)

    it('should not delete cache by wrong key', (done) => {
        request(server.app)
            .delete('/cache/BadKey')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }

                CacheModel.count()
                    .then((count) => {
                        expect(count).toEqual(1)
                        done()
                    })
                    .catch(done)
            })
    })

    it('should delete cache by key', (done) => {
        request(server.app)
            .delete('/cache/a')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }

                CacheModel.count()
                    .then((count) => {
                        expect(count).toEqual(0)
                        done()
                    })
                    .catch(done)
            })
    })
})
