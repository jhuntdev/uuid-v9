<?php

class UUIDv9 {

    public $uuidRegex = '/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/';

    private static function calcChecksum($hexString) {
        $data = array_map(function($byte) {
            return hexdec($byte);
        }, str_split($hexString, 2));

        $polynomial = 0x07;
        $crc = 0x00;

        foreach ($data as $byte) {
            $crc ^= $byte;

            for ($i = 0; $i < 8; $i++) {
                if ($crc & 0x80) {
                    $crc = ($crc << 1) ^ $polynomial;
                } else {
                    $crc <<= 1;
                }
            }
        }

        return str_pad(dechex($crc & 0xFF), 2, '0', STR_PAD_LEFT);
    }

    public static function verifyChecksum($uuid) {
        $base16String = substr(str_replace('-', '', $uuid), 0, 30);
        $crc = self::calcChecksum($base16String);
        return $crc === substr($uuid, 34, 2);
    }

    public static function validateUUIDv9($uuid, $checksum = false, $version = false) {
        return (
            is_string($uuid) &&
            preg_match('/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/', $uuid) &&
            (!$checksum || self::verifyChecksum($uuid)) &&
            (!$version ||
                ($version === true && $uuid[14] === '9') ||
                ($uuid[14] === (string)$version &&
                    (strpos('14', (string)$version) === false || strpos('89abAB', $uuid[19]) !== false)
                )
            )
        );
    }

    private static function randomBytes($count) {
        $str = '';
        for ($i = 0; $i < $count; $i++) {
            $r = dechex((int)(mt_rand() / mt_getrandmax() * 16));
            $str .= $r;
        }
        return $str;
    }

    private static function randomChar($chars) {
        $randomIndex = mt_rand(0, strlen($chars) - 1);
        return $chars[$randomIndex];
    }

    private static function isBase16($str) {
        $base16Regex = '/^[0-9a-fA-F]+$/';
        return preg_match($base16Regex, $str);
    }

    private static function validatePrefix($prefix) {
        if (!is_string($prefix)) {
            throw new Exception('Prefix must be a string');
        }

        if (strlen($prefix) > 8) {
            throw new Exception('Prefix must be no more than 8 characters');
        }

        if (!self::isBase16($prefix)) {
            throw new Exception('Prefix must be only hexadecimal characters');
        }
    }

    private static function addDashes($str) {
        return sprintf('%s-%s-%s-%s-%s', substr($str, 0, 8), substr($str, 8, 4), substr($str, 12, 4), substr($str, 16, 4), substr($str, 20));
    }

    public static function uuidv9($prefix = '', $timestamp = true, $checksum = false, $version = false, $compatible = false) {
        if ($prefix) {
            self::validatePrefix($prefix);
            $prefix = strtolower($prefix);
        }

        $center = is_numeric($timestamp) ? dechex($timestamp) : ($timestamp ? dechex(time()) : '');
        $suffix = self::randomBytes(32 - strlen($prefix) - strlen($center) - ($checksum ? 2 : 0) - ($compatible ? 2 : ($version ? 1 : 0)));
        $joined = $prefix . $center . $suffix;

        if ($compatible) {
            $joined = substr($joined, 0, 12) . ($timestamp ? '1' : '4') . substr($joined, 12, 3) . self::randomChar('89ab') . substr($joined, 15);
        } elseif ($version) {
            $joined = substr($joined, 0, 12) . '9' . substr($joined, 12);
        }

        if ($checksum) {
            $joined .= self::calcChecksum($joined);
        }

        return self::addDashes($joined);
    }

}

?>