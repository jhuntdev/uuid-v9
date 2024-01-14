import re
import random
import time

uuidv9_regex = re.compile(r'^[0-9a-f]{8}-[0-9a-f]{4}-9[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$', re.IGNORECASE)

def is_uuidv9(str_to_test):
    return isinstance(str_to_test, str) and uuidv9-regex.match(str_to_test)

def random_bytes(count):
    return ''.join(random.choice('0123456789abcdef') for _ in range(count))

base16_regex = re.compile(r'^[0-9a-fA-F]+$')

def is_base16(str):
    return bool(base16_regex.match(str))

def validate_prefix(prefix):
    if not isinstance(prefix, str):
        raise ValueError('Prefix must be a string')
    if len(prefix) > 8:
        raise ValueError('Prefix must be no more than 8 characters')
    if not is_base16(prefix):
        raise ValueError('Prefix must be only hexadecimal characters')

def add_dashes(str):
    return f'{str[:8]}-{str[8:12]}-9{str[12:15]}-{str[15:19]}-{str[19:]}'

def calc_checksum(str):
    decimals = [int(char, 16) for char in str]
    checksum = sum(decimals) % 16
    return format(checksum, 'x')

def uuid(prefix='', timestamp=True, checksum=False):
    if prefix:
        validate_prefix(prefix)
        prefix = prefix.lower()
    center = hex(int(time.time_ns() / 1000000))[2:] if timestamp else ''
    suffix = random_bytes(32 - len(prefix) - len(center) - (2 if checksum else 1))
    joined = prefix + center + suffix
    if checksum:
        joined += calc_checksum(joined)
    return add_dashes(joined)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Generate a string based on specified arguments.")
    parser.add_argument("--prefix", type=str, default="", help="Include a prefix")
    parser.add_argument("--unordered", action="store_true", help="Omit the timestamp")
    parser.add_argument("--checksum", action="store_true", help="Include checksum digit")
    args = parser.parse_args()
    print(uuid(args.prefix, not args.unordered, args.checksum))