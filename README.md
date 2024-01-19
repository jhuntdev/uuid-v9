# UUID v9

The v9 UUID supports both time-based sequential and random non-sequential UUIDs with an optional prefix, an optional checksum, and sufficient randomness to avoid collisions. It uses the UNIX timestamp for sequential UUIDs and CRC-8 for checksums. A version digit can be added if desired, but is omitted by default.

<!-- To learn more about UUID v9, please visit the website: https://uuid-v9.jhunt.dev -->

## Languages

JavaScript/TypeScript - https://www.npmjs.com/package/uuid-v9
Python - https://pypi.org/project/uuid-v9

More coming soon!

## Format

Here is the UUID v9 format: `xxxxxxxx-xxxx-9xxx-8xxx-xxxxxxxxxxyy`

x = prefix/timestamp/random, y = checksum (optional), 9 = version (optional), 8 = variant (compatibility mode)

## License

This project is licensed under the [MIT License](LICENSE).