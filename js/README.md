# uuid-v9

An ultra-fast, lightweight, zero-dependency JavaScript/TypeScript implementation of the UUID v9 proposal. The UUID v9 format allows generating both time-based sequential and random nonsequential IDs with an optional prefix of up to 12 hexadecimal characters, all with sufficient randomness to avoid collisions.

<!-- To learn more about UUID v9, please visit the website: https://uuid.jhunt.dev -->

## Installation

Install uuid-v9 from npm

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
import uuidv9 from 'uuid-v9' 

const orderedId = uuidv9()
const prefixedOrderedId = uuidv9('a1b2c3d4') // up to 12 hexadecimal characters
const unorderedId = uuidv9('', false)
const prefixedUnorderedId = uuidv9('a1b2c3d4', false)
```

## License

This project is licensed under the [MIT License](LICENSE).