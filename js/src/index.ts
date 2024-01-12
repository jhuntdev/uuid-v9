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
    if (prefix.length > 12) throw new Error('Prefix must be no more than 12 characters')
    if (!isBase16(prefix)) throw new Error('Prefix must be only hexadecimal characters')
}

const addDashes = (str:string):string => {
    return `${str.substring(0, 8)}-${str.substring(8, 12)}-9${str.substring(12, 15)}-${str.substring(15, 19)}-${str.substring(19)}`
}

const uuidv9 = (prefix:string = '', timestamp:boolean = true):string => {
    if (prefix) {
        validatePrefix(prefix)
        prefix = prefix.toLowerCase()
    }
    const center:string = timestamp ? new Date().getTime().toString(16) : ''
    const suffix:string = randomBytes(32 - prefix.length - center.length - 1)
    const joined:string = prefix + center + suffix
    return addDashes(joined)
}

export default uuidv9