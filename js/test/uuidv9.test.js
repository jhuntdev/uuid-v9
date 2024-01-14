const assert = require('assert')
const uuidv9 = require('../dist').default

let sleepTimeout
const sleep = (ms) => {
    clearInterval(sleepTimeout)
    return new Promise(resolve => sleepTimeout = setTimeout(resolve, ms))
}

const uuidRegex = {
    v9: /^[0-9a-f]{8}-[0-9a-f]{4}-9[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    generic: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
}

describe('uuidv9', () => {
    it('should validate as a version 9 UUID', async () => {
        const id1 = uuidv9()
        const id2 = uuidv9('a1b2c3d4')
        const id3 = uuidv9('', false)
        const id4 = uuidv9('a1b2c3d4', false)
        assert.strictEqual(uuidRegex.v9.test(id1), true)
        assert.strictEqual(uuidRegex.generic.test(id1), true)
        assert.strictEqual(uuidRegex.v9.test(id2), true)
        assert.strictEqual(uuidRegex.generic.test(id2), true)
        assert.strictEqual(uuidRegex.v9.test(id3), true)
        assert.strictEqual(uuidRegex.generic.test(id3), true)
        assert.strictEqual(uuidRegex.v9.test(id4), true)
        assert.strictEqual(uuidRegex.generic.test(id4), true)
    })
    it('should generate sequential IDs', async () => {
        const id1 = uuidv9()
        await sleep(2)
        const id2 = uuidv9()
        await sleep(2)
        const id3 = uuidv9()
        assert.strictEqual(!!id1, true)
        assert.strictEqual(!!id2, true)
        assert.strictEqual(!!id3, true)
        assert.strictEqual(id1 < id2, true)
        assert.strictEqual(id2 < id3, true)
    })
    it('should generate sequential IDs with a prefix', async () => {
        const id1 = uuidv9('a1b2c3d4')
        await sleep(2)
        const id2 = uuidv9('a1b2c3d4')
        await sleep(2)
        const id3 = uuidv9('a1b2c3d4')
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
        const idS = uuidv9('', false)
        await sleep(2)
        const idNs = uuidv9('', false)
        assert.strictEqual(!!idS, true)
        assert.strictEqual(!!idNs, true)
        assert.strictEqual(idS.substring(0, 4) !== idNs.substring(0, 4), true)
    })
    it('should generate non-sequential IDs with a prefix', async () => {
        const idS = uuidv9('a1b2c3d4', false)
        await sleep(2)
        const idNs = uuidv9('a1b2c3d4', false)
        assert.strictEqual(!!idS, true)
        assert.strictEqual(!!idNs, true)
        assert.strictEqual(idS.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(idNs.substring(0, 8), 'a1b2c3d4')
        assert.strictEqual(idS.substring(14, 18) !== idNs.substring(14, 18), true)
    })
    it('should generate IDs with a checksum', async () => {
        const id = uuidv9('', true, true)
        assert.strictEqual(!!id, true)
        assert.strictEqual(uuidRegex.v9.test(id), true)
        assert.strictEqual(uuidRegex.generic.test(id), true)
    })
})