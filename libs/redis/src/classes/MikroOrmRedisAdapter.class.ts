import type { CacheAdapter } from '@mikro-orm/core';
import IORedis from 'ioredis';
import type { Redis, RedisOptions } from 'ioredis';

export interface BaseOptions {
  expiration?: number;
  keyPrefix?: string;
  debug?: boolean;
}

export interface BuildOptions extends BaseOptions, RedisOptions {}
export interface ClientOptions extends BaseOptions {
  client: Redis;
  logger: (...args: unknown[]) => void;
}

export type RedisCacheAdapterOptions = BuildOptions | ClientOptions;

/**
 * Forked from https://github.com/ramiel/mikro-orm-cache-adapter-redis
 */
export class MikroOrmRedisAdapter implements CacheAdapter {
  private readonly client: Redis;
  private readonly debug: boolean;
  private readonly expiration?: number;
  private readonly keyPrefix!: string;
  private readonly logger: (...args: unknown[]) => void;

  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(options: RedisCacheAdapterOptions) {
    const { debug = false, expiration, keyPrefix } = options;
    this.logger = (options as ClientOptions).logger ?? console.log;

    this.keyPrefix = keyPrefix || 'mikro';
    if ((options as ClientOptions).client) {
      this.client = (options as ClientOptions).client;
    } else {
      const { ...redisOpt } = options as BuildOptions;
      this.client = new IORedis(redisOpt);
    }
    this.debug = debug;
    this.expiration = expiration;
    if (this.debug) {
      this.logger(
        `The Redis client for cache has been created! | Cache expiration: ${this.expiration}ms`,
      );
    }
  }

  /**
   * Add prefix to key
   * @param key Cache key
   * @returns Complete key
   */
  _getKey(key: string) {
    return `${this.keyPrefix}:${key}`;
  }

  /**
   * Get the value of a key
   * @param key Key name
   * @returns Key value
   */
  async get<T = any>(key: string): Promise<T | undefined> {
    const completKey = this._getKey(key);
    const data = await this.client.get(completKey);
    if (this.debug) {
      this.logger(`Get "${completKey}": "${data}"`);
    }
    if (!data) return undefined;
    return JSON.parse(data);
  }

  /**
   * Set the value of a key
   * @param key Key Name
   * @param data Key value
   * @param _origin Origin
   * @param expiration Expiration time (mls)
   */
  async set(
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    _origin: string,
    expiration = this.expiration,
  ): Promise<void> {
    const stringData = JSON.stringify(data);
    const completeKey = this._getKey(key);
    if (this.debug) {
      this.logger(
        `Set "${completeKey}": "${stringData}" with cache expiration ${expiration}ms`,
      );
    }
    if (expiration) {
      await this.client.set(completeKey, stringData, 'PX', expiration);
    } else {
      await this.client.set(completeKey, stringData);
    }
  }

  /**
   * Remove a key from the cache
   * @param key Key name
   */
  async remove(key: string): Promise<void> {
    const completeKey = this._getKey(key);
    await this.client.del(completeKey);
  }

  /**
   * Clear mikro-orm cache
   */
  async clear(): Promise<void> {
    if (this.debug) {
      this.logger('Clearing cache...');
    }
    return new Promise((resolve, reject) => {
      const stream = this.client.scanStream({
        match: `${this.keyPrefix}:*`,
      });
      const pipeline = this.client.pipeline();
      stream.on('data', (keys: string[]) => {
        if (keys.length) {
          keys.forEach(function (key) {
            pipeline.del(key);
          });
        }
      });
      stream.on('end', () => {
        pipeline.exec(err => {
          if (err) {
            if (this.debug) {
              this.logger('Error clearing cache');
            }
            return reject(err);
          }
          if (this.debug) {
            this.logger('Cleared cache');
          }
          resolve();
        });
      });
    });
  }

  /**
   * Close the connection
   */
  async close() {
    this.client.disconnect();
  }
}
