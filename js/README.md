# UUID v9

An ultra-fast, lightweight, zero-dependency JavaScript/TypeScript implementation of the UUID v9 proposal. The proposed UUID v9 format allows generating both time-based sequential and random non-sequential IDs with an optional prefix of up to 8 hexadecimal characters, an optional checksum digit, and sufficient randomness to avoid collisions. 

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
import uuidv9, { isUUIDv9 } from 'uuid-v9' 

const orderedId = uuidv9()
const prefixedOrderedId = uuidv9('a1b2c3d4') // up to 12 hexadecimal characters
const unorderedId = uuidv9('', false)
const prefixedUnorderedId = uuidv9('a1b2c3d4', false)
const orderedIdWithChecksum = uuidv9('', true, true)

const isValid = isUUIDv9(orderedId) // validator
```

## Note

Some UUID validators will not recognize v9 as a valid UUID even though it is. Three possible solutions are:

1) Use the included validator (recommended)
2) Bypass the validator (not recommended)
3) Substitute the version digit for an earlier version that will pass (not recommended)

Here is the UUID v9 format: `xxxxxxxx-xxxx-9xxx-xxxx-xxxxxxxxxxxy`

x = 0-9a-f (prefix, timestamp, random)
9 = version
y = checksum (optional)

## License

This project is licensed under the [MIT License](LICENSE).