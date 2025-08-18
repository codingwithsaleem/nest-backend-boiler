import { ArrayValueQuery, BasicValueQuery } from 'sift';

/**
 * Represents a mapping from the properties of a given type `T` to a Sift query.
 * This allows each property of the entity type `T` to be associated with a Sift query.
 * @template T The entity type whose properties can be associated with Sift queries.
 */
export type SiftQueryKeyInterface<T> = {
  [K in keyof T]?: BasicValueQuery<any> | ArrayValueQuery<any>;
};

/**
 * Represents a query structure for an entity type `T`, using a subset of its properties defined by `U`.
 * Any property from `U` that is not a key in `T` will have its type set to `never`.
 * This type is useful to ensure that only valid properties from the entity `T` are used in the query type,
 * and any extraneous properties are flagged as errors.
 * @template T The base entity type to be queried.
 * @template U The subset of `T` properties that should be associated with Sift queries.
 *             Must be a subset of `SiftQueryKeyInterface<T>`.
 */
export type SiftEntityQuery<T, U extends Partial<SiftQueryKeyInterface<T>>> = {
  [K in Exclude<keyof U, keyof T | '$and' | '$or'>]: never;
} & {
  $or?: U[];
  $and?: U[];
};
