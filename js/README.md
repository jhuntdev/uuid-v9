# UUID v9

An ultra-fast, lightweight, zero-dependency JavaScript/TypeScript implementation of the UUID v9 proposal. The proposed UUID v9 format allows generating both time-based sequential and random non-sequential IDs with an optional prefix of up to 8 hexadecimal characters, an optional version identifier, an optional checksum, and sufficient randomness to avoid collisions. 

<!-- To learn more about UUID v9, please visit the website: https://uuid-v9.jhunt.dev -->

## Installation

Install UUID v9 from npm

With npm:
```bash
npm install --save uuid-v9
```
or using yarn:
```bash
yarn add uuid-v9
```

## Usage

```javascript
import uuid, { isUUID, isUUIDv9 } from 'uuid-v9' 

const orderedId = uuid()
const prefixedOrderedId = uuid('a1b2c3d4') // up to 8 hexadecimal characters
const unorderedId = uuid('', false)
const prefixedUnorderedId = uuid('a1b2c3d4', false)
const orderedIdWithoutVersion = uuid('', true, false, true)
const orderedIdWithChecksum = uuid('', true, true, true)

const isValidV9 = isUUIDv9(orderedId) // UUID v9 validator
const isValid = isUUID(orderedIdWithoutVersion) // generic UUID validator
```

## Note

Some UUID validators will not recognize v9 as a valid UUID even though it is. Three possible solutions are:

1) Use the included validator (recommended)
2) Bypass the validator (not recommended)
3) Substitute the version digit for an earlier version that will pass (not recommended)

Here is the UUID v9 format: `xxxxxxxx-xxxx-9xxx-xxxx-xxxxxxxxxxxy`

x = 0-9a-f (prefix, timestamp, random)
9 = version (optional)
y = checksum (optional)

## License

This project is licensed under the [MIT License](LICENSE).