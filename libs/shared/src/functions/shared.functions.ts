import { instanceToPlain } from 'class-transformer';
import emojiRegex from 'emoji-regex';
import { isEqual, isEqualWith, isPlainObject } from 'lodash';

/**
 *
 */
export function getPublicFileUrl() {
  return process.env.STORAGE_PUBLIC_URL || '';
}

/**
 *
 * @param obj
 */
export function removeUndefinedProperties(obj: any) {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeUndefinedProperties(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
}

/**
 *
 * @param arr1
 * @param arr2
 */
export function hasCommonValues(arr1: any[], arr2: any[]): boolean {
  return arr1.some(v => arr2.includes(v));
}

/**
 *
 * @param name
 */
export function capitalizeName(name: string): string {
  if (!name) return undefined;
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 *
 * @param email
 */
export function removeSubaddress(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  let localPart = parts[0];
  const domainPart = parts[1];
  const localParts = localPart.split('+');
  if (localParts.length > 1) {
    localPart = localParts[0];
  }
  return `${localPart}@${domainPart}`;
}

/**
 *
 * @param ms
 */
export function wait(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Determines whether passed objects or instances have all of their properties equal
 * @param obj1 - First object or instance
 * @param obj2 - Second object or instance
 * @param ignoreUndefinedProperties - If true, undefined properties will be ignored during comparison: Default false
 * @returns True if objects or instances have all of their properties equal, false otherwise
 */
export function hasEqualProperties(
  obj1: any,
  obj2: any,
  ignoreUndefinedProperties: boolean = false,
): boolean {
  if (!isPlainObject(obj1)) {
    obj1 = instanceToPlain(obj1);
  }
  if (!isPlainObject(obj2)) {
    obj2 = instanceToPlain(obj2);
  }
  if (ignoreUndefinedProperties) {
    return isEqualWith(obj1, obj2, (val1, val2) => {
      if (val1 === undefined || val2 === undefined) {
        // Ignore comparison when either value is undefined
        return true;
      }
      // Perform default comparison
      return undefined;
    });
  }
  return isEqual(obj1, obj2);
}

/**
 * Counts the number of occurrences of a specific symbol within an object.
 * @param obj - The object to search for the symbol in.
 * @param symbol - The symbol to search for within the object. If the symbol has special meaning in regex (like $ or ^), ensure it's properly escaped.
 * @returns - The number of occurrences of the symbol in the object. 0 if !obj.
 * @example
 * const myObject = {
 *     prop1: "Hello $ world $",
 *     prop2: "Another $ symbol here"
 * };
 * const count = countSymbolInObject(myObject, "\\$");
 * // Outputs 3
 */
export function countSymbolInObject(obj: any, symbol: string): number {
  if (!obj) return 0;
  const str = JSON.stringify(obj);
  return (str.match(new RegExp(symbol, 'g')) || []).length;
}

/**
 * Counts the total occurrences of a list of words within an object.
 * @param obj - The object in which to search for the words.
 * @param  words - The list of words to search for within the object.
 * @returns - The total number of occurrences of the words in the object. 0 if !obj.
 * @example
 * const myObject = {
 *     text1: "Hello world. This is a test.",
 *     text2: "Another test with world inside.",
 * };
 * const wordList = ["world", "test"];
 * const count = countWordsInObject(myObject, wordList);
 * // Outputs: 3 (2 "test" and 1 "world")
 */
export function countWordsInObject(obj: any, words: string[]): number {
  if (!obj) return 0;
  const str = JSON.stringify(obj);
  let totalOccurrences = 0;
  words.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    const matches = str.match(regex);
    totalOccurrences += matches ? matches.length : 0;
  });
  return totalOccurrences;
}

/**
 * Converts a Date object to a string in the 'dd[separator]mm[separator]yyyy' format.
 * @param date The Date object to be converted into a string.
 * @param separator The separator to use between the day, month, and year (default is '-').
 * @returns The date formatted as a string in the specified format.
 * @example
 * // Returns '08-11-2023' if the date is November 8, 2023.
 * const dateString = dateToDdMmYyyy(new Date(2023, 10, 8));
 * @example
 * // Returns '08/11/2023' if the separator is '/' and the date is November 8, 2023.
 * const dateString = dateToDdMmYyyy(new Date(2023, 10, 8), '/');
 */
export function dateToDdMmYyyy(date: Date, separator: string = '-'): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${separator}${month}${separator}${year}`;
}

/**
 * Converts a Date object to a string in the 'hh[separator]mm[separator]ss' format.
 * @param date The Date object to be converted into a string.
 * @param separator The separator to use between the hours, minutes, and seconds (default is ':').
 * @returns The time formatted as a string in the specified format.
 * @example
 * // Returns '15:05:09' if the time is 3:05:09 PM and default separator is used.
 * const timeString = dateToHhMmSs(new Date(2023, 10, 8, 15, 5, 9));
 * @example
 * // Returns '15-05-09' if the separator is '-' and the time is 3:05:09 PM.
 * const timeString = dateToHhMmSs(new Date(2023, 10, 8, 15, 5, 9), '-');
 */
export function dateToHhMmSs(date: Date, separator: string = ':'): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}${separator}${minutes}${separator}${seconds}`;
}

/**
 * Extracts the initials from a full name.
 * This function splits the given name into words, takes the first letter of each word,
 * and combines them to form the initials. All letters in the initials are in uppercase.
 * @param name The full name from which to extract initials.
 * @returns A string representing the initials of the name.
 * // returns 'JD'
 * getInitials('Jean Dupont');
 */
export function getInitials(name: string): string {
  if (!name?.length) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

/**
 * Strips emojis from a given string or an array of strings.
 * @param texts The text or array of texts from which emojis will be removed.
 * @returns The text or array of texts with emojis removed, maintaining the original format (string or array).
 */
export function stripEmojis<T extends string | string[]>(texts: T): T {
  const regex = emojiRegex();
  if (typeof texts === 'string') {
    return texts.replace(regex, '') as T;
  } else if (Array.isArray(texts)) {
    return texts.map(text => text.replace(regex, '')) as T;
  }
}

/**
 * Calculates and rounds the percentage of a value in relation to a total.
 * @param value The value for which the percentage needs to be calculated.
 * @param total The total value to calculate the percentage against.
 * @param decimals The number of decimal places to round to.
 * @returns The rounded percentage of the value in relation to the total.
 */
export function getPercentage(
  value: number,
  total: number,
  decimals: number = 2,
): number {
  if (total === 0) return 0; // Avoid division by zero
  return parseFloat(((value / total) * 100).toFixed(decimals));
}
