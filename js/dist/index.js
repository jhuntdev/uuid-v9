"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomBytes = (count) => {
    let str = '';
    for (let i = 0; i < count; i++) {
        const r = (Math.random() * 16) | 0;
        str += r.toString(16);
    }
    return str;
};
const base16Regex = /^[0-9a-fA-F]+$/;
const isBase16 = (str) => base16Regex.test(str);
const validatePrefix = (prefix) => {
    if (typeof prefix !== 'string')
        throw new Error('Prefix must be a string');
    if (prefix.length > 12)
        throw new Error('Prefix must be no more than 12 characters');
    if (!isBase16(prefix))
        throw new Error('Prefix must be only hexadecimal characters');
};
const addDashes = (str) => {
    return `${str.substring(0, 8)}-${str.substring(8, 12)}-${str.substring(12, 16)}-${str.substring(16, 20)}-${str.substring(20)}`;
};
const uuidv9 = (prefix = '', timestamp = true) => {
    if (prefix) {
        validatePrefix(prefix);
        prefix = prefix.toLowerCase();
    }
    const center = timestamp ? new Date().getTime().toString(16) : '';
    const suffix = randomBytes(32 - prefix.length - center.length);
    const joined = prefix + center + suffix;
    return addDashes(joined);
};
exports.default = uuidv9;