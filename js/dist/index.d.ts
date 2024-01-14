export declare const uuidRegex: RegExp;
export declare const uuidV9Regex: RegExp;
export declare const verifyChecksum: (id: string) => boolean;
export declare const isUUID: (uuid: string, checksum?: boolean) => boolean;
export declare const isUUIDv9: (uuid: string, checksum?: boolean) => boolean;
declare const uuid: (prefix?: string, timestamp?: boolean, version?: boolean, checksum?: boolean) => string;
export default uuid;
