const expect = require('expect')

const randomString = require('./../../helpers/randomString')

describe('#randomString()', () => {
    it('should return random string', () => {
        const strA = randomString()
        const strB = randomString()
        expect(strA).toNotEqual(expected)
    })
})