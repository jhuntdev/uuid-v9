export declare const verifyChecksum: (uuid: string) => boolean;
export declare const validateUUIDv9: (uuid: string, checksum?: boolean, version?: boolean | number) => boolean;
export declare const isUUID: (uuid: string) => boolean;
declare const uuidv9: (prefix?: string, timestamp?: boolean | number, checksum?: boolean, version?: boolean, compatible?: boolean) => string;
export default uuidv9;
