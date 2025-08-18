import { SIFT_QUERIES } from '@app/shared/constants/sift.constants';
import { MikroOrmOperatorToGraphQLFilterField } from '@app/shared/enums/Sift.enums';
import { FilterQuery } from '@mikro-orm/core';

/**
 * Converts a Sift-style query to a Mikro-ORM query.
 * This function handles most common query operators and can be expanded as needed.
 * @template T - Type of the Sift-style query.
 * @template U - Type of the resulting Mikro-ORM query.
 * @param  matcher - The Sift-style query to be converted.
 * @param current - Used internally for recursion to hold the current state of the Mikro-ORM query.
 * @returns A Mikro-ORM compatible query.
 * @example
 * const siftQuery = { content: { $elemMatch: { text: { $eq: "Hello" } } } };
 * const mikroOrmQuery = convertSiftToMikroOrmQuery(siftQuery);
 */
export function convertSiftToMikroOrmQuery<
  T extends object = any,
  U extends object = any,
>(matcher: T, current: any = {}): FilterQuery<U> {
  // Iterate over each key-value pair in the matcher
  for (const [key, value] of Object.entries(matcher)) {
    // Check if the key is a known Sift-style query operator
    if (SIFT_QUERIES.includes(key)) {
      switch (key) {
        // Handle the $elemMatch operator by recursively processing its content
        case '$elemMatch':
          current = convertSiftToMikroOrmQuery(value, current);
          break;
        // For the $exists operator, check for null based on the boolean value
        case '$exists':
          Object.assign(current, value ? { $ne: null } : { $eq: null });
          break;
        // The $all operator is equivalent to the $in operator in Mikro-ORM for array values
        case '$all':
          Object.assign(current, { $in: value });
          break;
        // Directly assign other known operators
        default:
          Object.assign(current, { [key]: value });
          break;
      }
    } else {
      // If the key is not a known operator and its value is an object, recurse into it
      if (typeof value === 'object' && value !== null) {
        if (!current[key]) current[key] = {};
        convertSiftToMikroOrmQuery(value, current[key]);
      } else {
        // Otherwise, directly assign the key-value pair
        current[key] = value;
      }
    }
  }
  // Return the resulting Mikro-ORM compatible query
  return current;
}

/**
 * Converts a Sift-style query to a GraphQL query filter.
 * This function handles most common query operators and can be expanded as needed.
 * @template T - Type of the Sift-style query.
 * @param  matcher - The Sift-style query to be converted.
 * @param current - Used internally for recursion to hold the current state of the GraphQL filter query.
 * @returns A GraphQL filter compatible query.
 */
export function convertSiftToGraphQlFilter<T extends object = any>(
  matcher: T,
  current: any = {},
): any {
  // Iterate over each key-value pair in the matcher
  for (const [key, value] of Object.entries(matcher)) {
    // Check if the key is a known Sift-style query operator
    if (SIFT_QUERIES.includes(key)) {
      const convertedKey: string =
        MikroOrmOperatorToGraphQLFilterField[
          key as keyof typeof MikroOrmOperatorToGraphQLFilterField
        ];
      switch (key) {
        // Handle the $elemMatch operator by recursively processing its content
        case '$elemMatch':
          current = convertSiftToGraphQlFilter(value, current);
          break;
        // For the $exists operator, check for null based on the boolean value
        case '$exists':
          Object.assign(current, value ? { NE: null } : { EQ: null });
          break;
        // The $all operator is equivalent to the IN operator in GraphQL filters for array values
        case '$all':
          Object.assign(current, { IN: value });
          break;
        // Directly assign other known operators
        default:
          Object.assign(current, { [convertedKey]: value });
          break;
      }
    } else {
      // If the key is not a known operator and its value is an object, recurse into it
      if (typeof value === 'object' && value !== null) {
        if (!current[key]) current[key] = {};
        convertSiftToGraphQlFilter(value, current[key]);
      } else {
        // Otherwise, directly assign the key-value pair
        current[key] = value;
      }
    }
  }
  // Return the resulting GraphQL filter compatible query
  return current;
}

/**
 * Transforms a nested object structure into its dot notation equivalent.
 * If a key-value pair in the object matches a MongoDB operator, it retains the nested structure.
 * @param obj - The object to be transformed.
 * @param prefix - The current prefix to append to the key for dot notation.
 * @returns - An object transformed into dot notation.
 * @example
 * const input = { feedback: { source: { '$in': ['Google', 'Ubereats'] } } };
 * const output = transformMatcherToDotNotation(input);
 * // Outputs: { 'feedback.source': { '$in': ['Google', 'Ubereats'] } }
 */
export function transformMatcherToDotNotation(obj: any, prefix: string = ''): any {
  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const val = obj[key];
      // Special handling for $and, $or and $elemMatch
      if (key === '$and' || key === '$or') {
        result[key] = val.map((condition: any) =>
          transformMatcherToDotNotation(condition),
        );
        continue;
      } else if (key === '$elemMatch') {
        result[key] = transformMatcherToDotNotation(val);
        continue;
      }
      if (typeof val === 'object' && !SIFT_QUERIES.includes(key)) {
        const nestedKeys = Object.keys(val);
        const containsMongoOp = nestedKeys.some(k => SIFT_QUERIES.includes(k));

        if (containsMongoOp) {
          result[`${prefix}${key}`] = val;
        } else {
          const nestedResult = transformMatcherToDotNotation(val, `${prefix}${key}.`);
          Object.assign(result, nestedResult);
        }
      } else {
        result[`${prefix}${key}`] = val;
      }
    }
  }

  return result;
}

/**
 * Serializes a matcher object and then transforms it to its dot notation equivalent.
 * @param matcher - The matcher object to be serialized and transformed.
 * @returns - A serialized matcher object in dot notation.
 * @example
 * const matcher = { feedback: { source: { '$eq': 'Google' } } };
 * const serialized = serializeMatcher(matcher);
 * // Outputs: { 'feedback.source': { '$eq': 'Google' } }
 */
export function serializeMatcher(matcher: any) {
  const serializedMatcher = JSON.parse(JSON.stringify(matcher));
  return transformMatcherToDotNotation(serializedMatcher);
}
