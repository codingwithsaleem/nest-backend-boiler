import { FilterQuery, wrap } from '@mikro-orm/core';
import {
  AnyEntity,
  EntityData,
  EntityDTO,
  Loaded,
  Primary,
  RequiredEntityData,
} from '@mikro-orm/core/typings';
import {
  DeleteOptions,
  FindOneOptions,
  FindOneOrFailOptions,
} from '@mikro-orm/core/drivers/IDatabaseDriver';
import { CreateOptions } from '@mikro-orm/core/EntityManager';
import {
  DatabaseDuplicateException,
  DatabaseException,
  DatabaseForeignKeyException,
  DatabaseNullValueException,
  DatabaseValidationException,
} from '@app/database/exceptions/Database.exceptions';
import {
  FindPaginateResponse,
  FindPaginatedOptions,
} from '@app/database/types/Paginate.interfaces';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { DATABASE_PAGINATION_MAX_LIMIT } from '@app/database/constants/database.constants';

export abstract class CrudRepository<T extends object> extends EntityRepository<T> {
  static logger = new Logger('CrudRepository', { timestamp: false });

  /**
   * Handle Mikro-Orm exceptions on flush and throw appropriate HTTP exceptions
   * @param e The caught exception
   */
  private _handleFlushException(e: any) {
    if (e.name === 'ValidationError') {
      throw new DatabaseValidationException(String(e.message).split('\n')[0], e);
    } else if (e.code === '23505') {
      throw new DatabaseDuplicateException(e.detail, e);
    } else if (e.code === '23502') {
      throw new DatabaseNullValueException(e.detail, e);
    } else if (e.code === '23503') {
      throw new DatabaseForeignKeyException(e.detail, e);
    } else {
      CrudRepository.logger.warn('_handleFlushException', e);
      throw new DatabaseException(e.detail, e);
    }
  }

  /**
   * @inheritdoc
   * @param entity The entity to persist and flush
   */
  public async persistAndFlush(entity: AnyEntity | AnyEntity[]) {
    try {
      await this.getEntityManager().persistAndFlush(entity);
    } catch (e) {
      this._handleFlushException(e);
    }
  }

  /**
   * @inheritdoc
   */
  public async flush() {
    try {
      await this.getEntityManager().flush();
    } catch (e) {
      this._handleFlushException(e);
    }
  }

  /**
   * Create a new entity, persist it and flush it
   * @param data Entity data
   * @param options Create options
   * @returns The created entity
   */
  public async save(data: RequiredEntityData<T>, options?: CreateOptions): Promise<T> {
    const response = await this.create(data, options);
    await this.persistAndFlush(response);
    return response;
  }

  /**
   * Remove an entity
   * @dev This calls findOneOrFail before removing the entity.
   * This allows subscribers to be triggered.
   * @param where Entity filter
   * @param options Find options
   */
  public async delete(where: FilterQuery<T>, options?: DeleteOptions<T>) {
    const entity = await this.findOneOrFail(where, options);
    await this.getEntityManager().remove(entity).flush();
  }

  /**
   * Remove a list of entities
   * @dev This calls find before removing the entities.
   * This allows subscribers to be triggered.
   * @param where Entity filter
   * @param options Find options
   */
  public async deleteMany(where: FilterQuery<T>, options?: DeleteOptions<T>) {
    const entities = await this.find(where, {
      ...options,
      populate: false,
    });
    if (entities.length) {
      await this.getEntityManager().remove(entities).flush();
    }
  }

  /**
   * Update an entity
   * @dev This calls findOneOrFail before updating the entity.
   * This allows subscribers to be triggered.
   * @param where Entity filter
   * @param data Update data
   * @param options Find options
   * @returns The updated entity
   */
  public async update(
    where: FilterQuery<T>,
    data: EntityData<Loaded<T, never>> | Partial<EntityDTO<Loaded<T, never>>>,
    options?: FindOneOrFailOptions<T, never>,
  ) {
    const entity = await this.findOneOrFail(where, options);
    wrap(entity).assign(data, {
      mergeObjects: true,
      ...options,
    });
    await this.persistAndFlush(entity);
    return entity;
  }

  /**
   * Find or create an entity
   * @param findOptions Entity filter
   * @param data Entity data
   * @param options Find options
   * @returns The found or created entity
   */
  public async findOrCreate<P extends string = never>(
    findOptions: FilterQuery<T>,
    data: RequiredEntityData<T>,
    options?: FindOneOrFailOptions<T, P>,
  ): Promise<T> {
    try {
      return await this.findOneOrFail(findOptions, options);
    } catch (e) {
      return this.create(data, options);
    }
  }

  /**
   * Find or insert an entity
   * @param findOptions Entity filter
   * @param data Entity data
   * @param options Find options
   * @returns The found or inserted entity
   */
  public async findOrInsert<P extends string = never>(
    findOptions: FilterQuery<T>,
    data: RequiredEntityData<T>,
    options?: FindOneOrFailOptions<T, P>,
  ): Promise<T> {
    try {
      return await this.findOneOrFail(findOptions, options);
    } catch (e) {
      return await this.save(data, options);
    }
  }

  /**
   * Update or create an entity
   * @param where Entity filter
   * @param data Entity data
   * @param options Find options
   * @returns The updated or created entity
   */
  public async updateOrCreate(
    where: FilterQuery<T>,
    data: (EntityData<Loaded<T, never>> | Partial<EntityDTO<Loaded<T, never>>>) &
      RequiredEntityData<T>,
    options?: CreateOptions,
  ): Promise<T> {
    try {
      return await this.update(where, data, options);
    } catch (e) {
      return this.create(data, options);
    }
  }

  /**
   * Update or insert an entity
   * @param where Entity filter
   * @param data Entity data
   * @param options Find options
   * @returns The updated or inserted entity
   */
  public async updateOrInsert(
    where: FilterQuery<T>,
    data: (EntityData<Loaded<T, never>> | Partial<EntityDTO<Loaded<T, never>>>) &
      RequiredEntityData<T>,
    options?: CreateOptions,
  ): Promise<T> {
    try {
      return await this.update(where, data, options);
    } catch (e) {
      return await this.save(data, options);
    }
  }

  /**
   * Find all entities from a table and apply pagination
   * @param options Find options
   * @returns All entities with pagination
   */
  public async findAllPaginated<P extends string = never>(
    options?: FindPaginatedOptions<T, P>,
  ) {
    return this.findPaginated(null, options);
  }

  /**
   * Find entities from a table and apply pagination
   * @param where Entity filter
   * @param options Find options
   * @returns Matching entities with pagination
   */
  public async findPaginated<P extends string = never>(
    where: FilterQuery<T>,
    options?: FindPaginatedOptions<T, P>,
  ): Promise<FindPaginateResponse<T>> {
    const limit = options?.limit || 100;
    const page = options?.page || 0;
    if (limit > DATABASE_PAGINATION_MAX_LIMIT) {
      throw new DatabaseValidationException(
        `Maximum pagination limit is ${DATABASE_PAGINATION_MAX_LIMIT}`,
      );
    }
    const [results, count] = await this.findAndCount(where, {
      ...options,
      limit: limit,
      offset: page * limit,
    });
    return {
      items: results,
      meta: {
        itemCount: results.length,
        totalItems: count,
        itemsPerPage: limit,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    };
  }

  /**
   * Determine if an entity exists
   * @param where Entity filter
   * @param options Find Options
   * @returns True if exists, false otherwise
   */
  public async exists<P extends string = never>(
    where: FilterQuery<T>,
    options?: FindOneOptions<T, P>,
  ): Promise<boolean> {
    try {
      await this.findOneOrFail(where, options);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Get a list of references from an array of ids
   * @param ids Array of ids
   * @returns Array of references
   */
  public getReferences(ids: Primary<T>[]): T[] {
    if (ids?.length) {
      return ids.map(id => this.getReference(id));
    }
    return [];
  }
}
