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

    it('should insert cache if key doesnt exist', (done) => {
        request(server.app)
            .put('/cache/some_key').send({
                data: 'some_data',
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                const data = res.body.data
                expect(data).toEqual('some_data')
                CacheModel.count()
                    .then((count) => {
                        expect(count).toEqual(1)
                        done()
                    })
                    .catch(done)
            })
    })

    it('should update cache if key exist', (done) => {
        request(server.app)
            .put('/cache/some_key').send({
                data: 'some_data_2',
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    done(err)
                }
                const data = res.body.data
                expect(data).toEqual('some_data_2')

                CacheModel.count()
                    .then((count) => {
                        expect(count).toEqual(1)
                        done()
                    })
                    .catch(done)
            })
    })
})
