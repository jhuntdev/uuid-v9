export declare const uuidRegex: RegExp;
export declare const uuidV1Regex: RegExp;
export declare const uuidV4Regex: RegExp;
export declare const uuidV9Regex: RegExp;
export declare const verifyChecksum: (uuid: string) => boolean;
export declare const isUUID: (uuid: string, checksum?: boolean) => boolean;
declare const uuid: (prefix?: string, timestamp?: boolean | number, checksum?: boolean, version?: boolean, compatible?: boolean) => string;
export interface UUIDGeneratorConfig {
    prefix?: string;
    timestamp?: boolean | number;
    checksum?: boolean;
    version?: boolean;
    compatible?: boolean;
}
export declare const UUIDGenerator: (config: UUIDGeneratorConfig) => (prefix?: string, timestamp?: boolean | number, checksum?: boolean, version?: boolean, compatible?: boolean) => string;
export default uuid;
