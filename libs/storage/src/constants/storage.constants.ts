import { TIME_1_SECOND_MLS } from '@app/shared';

export const STORAGE_1_BYTES = 1;
export const STORAGE_10_BYTES = 10;
export const STORAGE_100_BYTES = 100;
export const STORAGE_1_KILOBYTE = 1024;
export const STORAGE_10_KILOBYTES = 10240;
export const STORAGE_100_KILOBYTES = 102400;
export const STORAGE_1_MEGABYTE = 1048576;
export const STORAGE_10_MEGABYTES = 10485760;
export const STORAGE_100_MEGABYTES = 104857600;
export const STORAGE_1_GIGABYTE = 1073741824;
export const STORAGE_10_GIGABYTES = 10737418240;
export const STORAGE_100_GIGABYTES = 107374182400;
export const STORAGE_1_TERABYTE = 1099511627776;
export const STORAGE_10_TERABYTES = 10995116277760;
export const STORAGE_100_TERABYTES = 109951162777600;

export const STORAGE_MAX_FILE_SIZE = 35 * STORAGE_1_MEGABYTE;

export const DOWNLOAD_TIMEOUT_MS = TIME_1_SECOND_MLS * 10;
export const DOWNLOAD_MAX_BODY_LENGTH = STORAGE_MAX_FILE_SIZE;

export const IMAGE_SMALL_WEIGHT = 256;
export const IMAGE_MEDIUM_WEIGHT = 600;
export const IMAGE_DEFAULT_QUALITY = 80;
export const SHARP_CPU_EFFORT = 3;

export const STORAGE_FORBIDDEN_FILE_TYPES = [
  'vbs',
  'exe',
  'bin',
  'bat',
  'chm',
  'com',
  'cpl',
  'crt',
  'hlp',
  'hta',
  'inf',
  'ins',
  'isp',
  'jse',
  'lnk',
  'mdb',
  'pcd',
  'pif',
  'reg',
  'scr',
  'sct',
  'shs',
  'vbe',
  'vba',
  'wsf',
  'wsh',
  'wsl',
  'msc',
  'msi',
  'msp',
];
