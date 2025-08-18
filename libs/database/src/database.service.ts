import { RedisService } from '@app/redis';
import { DatabaseEnvironmentValidator } from '@app/database/environment/database.environment.validator';
import { DatabaseNotFoundException } from '@app/database/exceptions/Database.exceptions';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MikroOrmRedisAdapter } from '@app/redis/classes/MikroOrmRedisAdapter.class';
import { LoggerService } from '@app/logger';

@Injectable()
export class DatabaseService {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  constructor(
    private readonly configService: ConfigService<DatabaseEnvironmentValidator, true>,
    private readonly redisService: RedisService,
    private readonly logger: LoggerService,
  ) {}
  /**
   * Mikro-orm configuration
   * @returns Mikro-orm configuration
   */
  public async createMikroOrmOptions(): Promise<MikroOrmModuleOptions<PostgreSqlDriver>> {
    return {
      type: 'postgresql',
      autoLoadEntities: true,
      discovery: { warnWhenNoEntities: false },
      port: this.configService.get('DB_PORT', { infer: true }),
      dbName: this.configService.get('DB_NAME', { infer: true }),
      user: this.configService.get('DB_USER', { infer: true }),
      host: this.configService.get('DB_HOST', { infer: true }),
      debug: this.configService.get('DB_DEBUG', { infer: true }) === 'true',
      password: this.configService.get('DB_PASSWORD', { infer: true }),
      allowGlobalContext:
        this.configService.get('MIKRO_ORM_ALLOW_GLOBAL_CONTEXT') === 'true',
      ignoreUndefinedInQuery: true,
      resultCache: {
        adapter: MikroOrmRedisAdapter,
        options: {
          client: this.redisService.cache,
        },
      },
      findOneOrFailHandler(entityName, where) {
        return new DatabaseNotFoundException(`${entityName} not found`, {
          where,
        });
      },
    };
  }
}
