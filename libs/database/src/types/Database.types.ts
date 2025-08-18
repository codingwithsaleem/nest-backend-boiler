import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { KeyInterface } from '@app/shared';
import { EntityRepositoryType } from '@mikro-orm/core';

/**
 * Generates a type with keys mirroring those of a given entity derived from `BaseEntity`,
 * while excluding specific keys related to entity management and lifecycle.
 * This is particularly useful with dtos or when an object is needed with the same keys as the entity,
 * but without the constraints on the types of those keys.
 *
 * The excluded keys are:
 * - 'id': The primary key of the entity.
 * - 'createdAt': A timestamp indicating when the entity was created.
 * - 'updatedAt': A timestamp indicating when the entity was last updated.
 * - Entity repository type keys.
 * @template T - A type that extends `BaseEntity`. This constraint ensures the utility is applied
 *               only to entities that inherit from `BaseEntity`.
 * @type {object}
 * @example
 * // If there is a User entity that extends BaseEntity:
 * type UserKeyInterface = EnsureEntityKeys<User>;
 * // UserKeyInterface will have all keys of User except 'id', 'createdAt', 'updatedAt', and entity repository type keys.
 */
export type EnsureEntityKeys<T extends BaseEntity> = KeyInterface<
  Omit<T, typeof EntityRepositoryType | 'id' | 'createdAt' | 'updatedAt'>
>;
