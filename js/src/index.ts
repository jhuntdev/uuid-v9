export const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const uuidV9Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-9[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const verifyChecksum = (id:string):boolean => {
    const decimals = id.replace(/-/g, '').substring(0, 31).split('')
    const checksum = decimals.reduce((sum, value) => sum + parseInt(value, 16), 0) % 16
    return id.substring(35, 36) === checksum.toString(16)
}

export const isUUID = (uuid:string, checksum:boolean = false) => (
    typeof uuid === 'string' &&
    uuidRegex.test(uuid) &&
    (!checksum || verifyChecksum(uuid))
)

export const isUUIDv9 = (uuid:string, checksum:boolean = false) => (
    typeof uuid === 'string' &&
    uuidV9Regex.test(uuid) &&
    (!checksum || verifyChecksum(uuid))
)

const randomBytes = (count:number):string => {
    let str = ''
    for (let i = 0; i < count; i++) {
        const r = (Math.random() * 16) | 0;
        str += r.toString(16)
    }
    return str
}

const base16Regex = /^[0-9a-fA-F]+$/
const isBase16 = (str:string):boolean => base16Regex.test(str)

const validatePrefix = (prefix:string):void => {
    if (typeof prefix !== 'string') throw new Error('Prefix must be a string')
    if (prefix.length > 8) throw new Error('Prefix must be no more than 8 characters')
    if (!isBase16(prefix)) throw new Error('Prefix must be only hexadecimal characters')
}

const addDashes = (str:string):string => {
    return `${str.substring(0, 8)}-${str.substring(8, 12)}-${str.substring(12, 16)}-${str.substring(16, 20)}-${str.substring(20)}`
}

const calcChecksum = (str:string) => {
    const decimals = str.split('') // .map((char:string) => )
    const checksum = decimals.reduce((sum, value) => sum + parseInt(value, 16), 0) % 16
    return checksum.toString(16)
}

const uuid = (prefix:string = '', timestamp:boolean = true, version:boolean = true, checksum:boolean = false):string => {
    if (prefix) {
        validatePrefix(prefix)
        prefix = prefix.toLowerCase()
    }
    const center:string = timestamp ? new Date().getTime().toString(16) : ''
    const suffix:string = randomBytes(32 - prefix.length - center.length - (version ? 1 : 0) - (checksum ? 1 : 0))
    let joined:string = prefix + center + suffix
    if (version) {
        joined = joined.substring(0, 12) + '9' + joined.substring(12)
    }
    if (checksum) {
        joined += calcChecksum(joined)
    }
    return addDashes(joined)
}

export default uuid