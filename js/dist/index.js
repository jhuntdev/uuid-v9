"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUUID = exports.verifyChecksum = exports.uuidV9Regex = exports.uuidV4Regex = exports.uuidV1Regex = exports.uuidRegex = void 0;
exports.uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
exports.uuidV1Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-1[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
exports.uuidV4Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
exports.uuidV9Regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-9[0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
function calcChecksum(hexString) {
    const data = hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16));
    const polynomial = 0x07;
    let crc = 0x00;
    for (const byte of data) {
        crc ^= byte;
        for (let i = 0; i < 8; i++) {
            if (crc & 0x80) {
                crc = (crc << 1) ^ polynomial;
            }
            else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFF).toString(16).padStart(2, '0');
    // return (crc & 0xF).toString(16)
}
const verifyChecksum = (uuid) => {
    const base16String = uuid.replace(/-/g, '').substring(0, 30);
    const crc = calcChecksum(base16String);
    return crc === uuid.substring(34, 36);
};
exports.verifyChecksum = verifyChecksum;
// const calcChecksum = (str:string) => {
//     const decimals = str.split('') // .map((char:string) => )
//     const checksum = decimals.reduce((sum, value) => sum + parseInt(value, 16), 0) % 16
//     return checksum.toString(16)
// }
// export const verifyChecksum = (id:string):boolean => {
//     const decimals = id.replace(/-/g, '').substring(0, 31).split('')
//     const checksum = decimals.reduce((sum, value) => sum + parseInt(value, 16), 0) % 16
//     return id.substring(35, 36) === checksum.toString(16)
// }
const isUUID = (uuid, checksum = false) => (typeof uuid === 'string' &&
    exports.uuidRegex.test(uuid) &&
    (!checksum || (0, exports.verifyChecksum)(uuid)));
exports.isUUID = isUUID;
// export const isUUIDv9 = (uuid:string, checksum:boolean = false) => (
//     typeof uuid === 'string' &&
//     uuidV9Regex.test(uuid) &&
//     (!checksum || verifyChecksum(uuid))
// )
const randomBytes = (count) => {
    let str = '';
    for (let i = 0; i < count; i++) {
        const r = (Math.random() * 16) | 0;
        str += r.toString(16);
    }
    return str;
};
const randomChar = (chars) => {
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars.charAt(randomIndex);
};
const base16Regex = /^[0-9a-fA-F]+$/;
const isBase16 = (str) => base16Regex.test(str);
const validatePrefix = (prefix) => {
    if (typeof prefix !== 'string')
        throw new Error('Prefix must be a string');
    if (prefix.length > 8)
        throw new Error('Prefix must be no more than 8 characters');
    if (!isBase16(prefix))
        throw new Error('Prefix must be only hexadecimal characters');
};
const addDashes = (str) => {
    return `${str.substring(0, 8)}-${str.substring(8, 12)}-${str.substring(12, 16)}-${str.substring(16, 20)}-${str.substring(20)}`;
};
const uuid = (prefix = '', timestamp = true, checksum = false, version = false, compatible = false) => {
    if (prefix) {
        validatePrefix(prefix);
        prefix = prefix.toLowerCase();
    }
    const center = timestamp ? new Date().getTime().toString(16) : '';
    const suffix = randomBytes(32 - prefix.length - center.length - (checksum ? 2 : 0) - (compatible ? 2 : version ? 1 : 0));
    let joined = prefix + center + suffix;
    if (checksum) {
        joined += calcChecksum(joined);
    }
    if (compatible) {
        joined = joined.substring(0, 12) + (timestamp ? '1' : '4') + joined.substring(12, 15) + randomChar('89ab') + joined.substring(15);
    }
    else if (version) {
        joined = joined.substring(0, 12) + '9' + joined.substring(12);
    }
    return addDashes(joined);
};
exports.default = uuid;
