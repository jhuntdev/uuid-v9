# UUID v9

An ultra-fast, lightweight, zero-dependency Python implementation of the UUID v9 proposal. The proposed UUID v9 format allows generating both time-based sequential and random non-sequential IDs with an optional prefix of up to 8 hexadecimal characters, an optional version identifier, an optional checksum, and sufficient randomness to avoid collisions. 

<!-- To learn more about UUID v9, please visit the website: https://uuid-v9.jhunt.dev -->

## Installation

Install UUID v9 from PyPI.

```bash
python3 -m pip install uuid-v9
```

## Usage

```python
from uuid_v9 import uuid, is_uuidv9, is_uuid

ordered_id = uuid()
prefixed_ordered_id = uuid('a1b2c3d4') # up to 8 hexadecimal characters
unordered_id = uuid('', False)
prefixed_unordered_id = uuid('a1b2c3d4', False)
ordered_id_without_version = uuid('', True, False)
ordered_id_with_checksum = uuid('', True, True, True)

const is_valid_v9 = is_uuidv9(ordered_id, true) # UUID v9 validator with checksum
const is_valid = is_uuid(ordered_id_without_version) # generic UUID validator
```

### Command Line

```bash
python3 uuid_v9.py
python3 uuid_v9.py --prefix 'a1b2c3d4'
python3 uuid_v9.py --unordered
python3 uuid_v9.py --noversion
python3 uuid_v9.py --checksum
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