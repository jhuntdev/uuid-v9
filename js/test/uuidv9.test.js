const assert = require('assert')
const uuidv9 = require('../dist').default

let sleepTimeout
const sleep = (ms) => {
    clearInterval(sleepTimeout)
    return new Promise(resolve => sleepTimeout = setTimeout(resolve, ms))
}

describe('uuidv9', () => {
    it('should generate sequential IDs', async () => {
        const id1 = uuidv9()
        await sleep(1)
        const id2 = uuidv9()
        await sleep(1)
        const id3 = uuidv9()
        assert.strictEqual(!!id1, true)
        assert.strictEqual(!!id2, true)
        assert.strictEqual(!!id3, true)
        assert.strictEqual(id1 < id2, true)
        assert.strictEqual(id2 < id3, true)
    })
    it('should generate sequential IDs with a prefix', async () => {
        const id1 = uuidv9('a1b2c3d4e5f6')
        await sleep(1)
        const id2 = uuidv9('a1b2c3d4e5f6')
        await sleep(1)
        const id3 = uuidv9('a1b2c3d4e5f6')
        assert.strictEqual(!!id1, true)
        assert.strictEqual(!!id2, true)
        assert.strictEqual(!!id3, true)
        assert.strictEqual(id1 < id2, true)
        assert.strictEqual(id2 < id3, true)
        assert.strictEqual(id1.substring(0, 13), 'a1b2c3d4-e5f6')
        assert.strictEqual(id2.substring(0, 13), 'a1b2c3d4-e5f6')
        assert.strictEqual(id3.substring(0, 13), 'a1b2c3d4-e5f6')
        assert.strictEqual(id1.substring(14, 18), id2.substring(14, 18))
        assert.strictEqual(id2.substring(14, 18), id3.substring(14, 18))
    })
    it('should generate non-sequential IDs', async () => {
        const idS = uuidv9('', false)
        await sleep(1)
        const idNs = uuidv9('', false)
        assert.strictEqual(!!idS, true)
        assert.strictEqual(!!idNs, true)
        assert.strictEqual(idS.substring(0, 4) !== idNs.substring(0, 4), true)
    })
    it('should generate non-sequential IDs with a prefix', async () => {
        const idS = uuidv9('a1b2c3d4e5f6', false)
        await sleep(1)
        const idNs = uuidv9('a1b2c3d4e5f6', false)
        assert.strictEqual(!!idS, true)
        assert.strictEqual(!!idNs, true)
        assert.strictEqual(idS.substring(0, 13), 'a1b2c3d4-e5f6')
        assert.strictEqual(idNs.substring(0, 13), 'a1b2c3d4-e5f6')
        assert.strictEqual(idS.substring(14, 18) !== idNs.substring(14, 18), true)
    })
})