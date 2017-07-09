const expect = require('expect')

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            const actual = [1, 2, 3].indexOf(4)
            const expected = -1
            expect(actual).toEqual(expected)
        })
    })
})