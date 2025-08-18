/**
 * Determines the key type of the provided type `T`.
 * If `T` has no keys (i.e., is an empty object or type), it defaults to `string`.
 * @template T - The type for which to determine the key type.
 * @type {string | keyof T}
 */
export type KeyOf<T> = keyof T extends never ? string : keyof T;

/**
 * Wrapper type used to circumvent ESM modules circular dependency issue
 * caused by reflection metadata saving the type of the property.
 */
export type WrapperType<T> = T;

/**
 * Produces an interface with the same keys as type `T`, but all values are of type `any`.
 * This can be useful when you want to capture just the keys of an object type without caring about their associated values.
 * @template T - The type from which to extract keys.
 * @type {object}
 */
export type KeyInterface<T> = {
  [K in keyof Required<T>]: any;
};

/**
 * Ensures that type `U` only has keys that are present in type `T`.
 * Essentially, this enforces that `U` does not introduce any new keys that are not in `T`.
 * If this condition is met, `U` is returned; otherwise, a type error is raised.
 * @template T - The base type that provides the allowed keys.
 * @template U - The type being checked to ensure it only uses keys from `T`.
 * @type {U}
 */
export type EnsureKeysOnly<T, U extends T> = U & {
  [K in Exclude<keyof U, keyof T>]: never;
};

/**
 * A type representing a typed property decorator in TypeScript.
 * @template T - The type of the target to which the decorator is applied. Defaults to `unknown`.
 * @param {T} target - The target object on which the property is defined or inherited.
 * @param {string | symbol} propertyKey - The name of the property.
 * @returns {void}
 */
export type TypedPropertyDecorator<T = unknown> = (
  target: T,
  propertyKey: string | symbol,
) => void;

/**
 * A type representing a typed decorator in TypeScript.
 * @template T - The type of the target to which the decorator is applied. Defaults to `unknown`.
 * @param {T} target - The target object.
 * @returns {void}
 */
export type TypedDecorator<T = unknown> = (target: T) => void;
