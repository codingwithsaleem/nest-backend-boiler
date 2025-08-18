import { RedisEnvironmentValidator } from '@app/redis/environment/redis.environment.validator';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly configService: ConfigService<RedisEnvironmentValidator, true>,
  ) {}

  /// Redis client to use for caching only
  public cache = new Redis({
    host: this.configService.get('REDIS_HOST', { infer: true }),
    port: this.configService.get('REDIS_PORT', { infer: true }),
  });

  /// Redis client to use for event publishing only
  public publisher = new Redis({
    host: this.configService.get('REDIS_HOST', { infer: true }),
    port: this.configService.get('REDIS_PORT', { infer: true }),
  });

  /// Redis client to be used for receiving events only
  public subscriber = new Redis({
    host: this.configService.get('REDIS_HOST', { infer: true }),
    port: this.configService.get('REDIS_PORT', { infer: true }),
  });

  /**
   * Close redis connections on module destroy
   */
  async onModuleDestroy(): Promise<void> {
    await Promise.all([this.cache.quit(), this.publisher.quit(), this.subscriber.quit()]);
  }

  /*********************************** LIBRARY ******************************************/
  /**
   * Get the value of a key
   * @param key Key name
   * @returns Key value
   */
  async get<T = any>(key: string): Promise<T | undefined> {
    const data = await this.cache.get(key);
    if (!data) return undefined;
    return JSON.parse(data);
  }

  /**
   * Set the value of a key
   * @param key Key Name
   * @param value Key value
   * @param expiration Expiration time in milliseconds - optionnal
   */
  async set(key: string, value: any, expiration?: number): Promise<void> {
    const stringData = JSON.stringify(value);
    if (expiration && expiration > 0) {
      await this.cache.set(key, stringData, 'PX', expiration);
    } else {
      await this.cache.set(key, stringData);
    }
  }

  /**
   * Attempts to acquire a lock on the specified key.
   * @param key - The key for which the lock should be acquired.
   * @param expiration Expiration time in milliseconds - optionnal
   * @returns `true` if the lock was successfully acquired, otherwise `false`.
   */
  async lock(key: string, expiration?: number): Promise<boolean> {
    const result = await this.cache.setnx(key, 1);
    if (result == 1) {
      if (expiration && expiration > 0) {
        await this.cache.set(key, 1, 'PX', expiration);
      }
      return true;
    }
    return false;
  }

  /**
   * Releases a previously acquired lock on the specified key.
   * @param  key - The key for which the lock should be released.
   * @returns -
   */
  async unlock(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
