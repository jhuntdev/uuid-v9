const assert = require('assert')
const {
    default: uuid,
    verifyChecksum,
    uuidRegex,
    uuidV9Regex,
    isUUID,
    isUUIDv9
} = require('../dist')

let sleepTimeout
const sleep = (ms) => {
    clearInterval(sleepTimeout)
    return new Promise(resolve => sleepTimeout = setTimeout(resolve, ms))
}

describe('uuid', () => {
    it('should validate as a version 9 UUID', async () => {
        const id1 = uuid()
        const id2 = uuid('a1b2c3d4')
        const id3 = uuid('', false)
        const id4 = uuid('a1b2c3d4', false)
        assert.strictEqual(uuidV9Regex.test(id1), true)
        assert.strictEqual(uuidRegex.test(id1), true)
        assert.strictEqual(uuidV9Regex.test(id2), true)
        assert.strictEqual(uuidRegex.test(id2), true)
        assert.strictEqual(uuidV9Regex.test(id3), true)
        assert.strictEqual(uuidRegex.test(id3), true)
        assert.strictEqual(uuidV9Regex.test(id4), true)
        assert.strictEqual(uuidRegex.test(id4), true)
    })
    it('should generate sequential IDs', async () => {
        const id1 = uuid()
        await sleep(2)
        const id2 = uuid()
        await sleep(2)
        const id3 = uuid()
        assert.strictEqual(!!id1, true)
        assert.strictEqual(!!id2, true)
        assert.strictEqual(!!id3, true)
        assert.strictEqual(id1 < id2, true)
        assert.strictEqual(id2 < id3, true)
    })
    it('should generate sequential IDs with a prefix', async () => {
        const id1 = uuid('a1b2c3d4')
        await sleep(2)
        const id2 = uuid('a1b2c3d4')
        await sleep(2)
        const id3 = uuid('a1b2c3d4')
        assert.strictEqual(!!id1, true)
        assert.strictEqual(!!id2, true)
        assert.strictEqual(!!id3, true)
        assert.strictEqual(id1 < id2, true)
        assert.strictEqual(id2 < id3, true)
        assert.strictEqual(id1.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(id2.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(id3.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(id1.substring(14, 18), id2.substring(14, 18))
        assert.strictEqual(id2.substring(14, 18), id3.substring(14, 18))
    })
    it('should generate non-sequential IDs', async () => {
        const idS = uuid('', false)
        await sleep(2)
        const idNs = uuid('', false)
        assert.strictEqual(!!idS, true)
        assert.strictEqual(!!idNs, true)
        assert.strictEqual(idS.substring(0, 4) !== idNs.substring(0, 4), true)
    })
    it('should generate non-sequential IDs with a prefix', async () => {
        const idS = uuid('a1b2c3d4', false)
        await sleep(2)
        const idNs = uuid('a1b2c3d4', false)
        assert.strictEqual(!!idS, true)
        assert.strictEqual(!!idNs, true)
        assert.strictEqual(idS.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(idNs.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(idS.substring(14, 18) !== idNs.substring(14, 18), true)
    })
    it('should generate IDs without a version', async () => {
        const id = uuid('', true, false)
        assert.strictEqual(!!id, true)
        assert.strictEqual(uuidRegex.test(id), true)
    })
    it('should generate IDs with a checksum', async () => {
        const id = uuid('', true, true, true)
        assert.strictEqual(!!id, true)
        assert.strictEqual(uuidV9Regex.test(id), true)
        assert.strictEqual(uuidRegex.test(id), true)
        assert.strictEqual(verifyChecksum(id), true)
    })
    it('should correctly validate and verify checksum', async () => {
        const id1 = uuid('', true, true, true)
        const id2 = uuid('', false, false, false)
        assert.strictEqual(!!id1, true)
        assert.strictEqual(!!id2, true)
        assert.strictEqual(isUUID(id1, true), true)
        assert.strictEqual(isUUIDv9(id1, true), true)
        assert.strictEqual(verifyChecksum(id1), true)
        assert.strictEqual(isUUID(id2), true)
    })
})