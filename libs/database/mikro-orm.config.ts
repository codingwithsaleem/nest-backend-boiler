import { Options } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export const config: Options<PostgreSqlDriver> = {
  type: 'postgresql',
  port: +process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  entities: ['dist/libs/database/src/entities', 'dist/libs/database/src/embeddables'],
  entitiesTs: ['libs/database/src/entities', 'libs/database/src/embeddables'],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    pathTs: 'libs/database/migrations', // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  seeder: {
    pathTs: 'libs/database/src/seeders', // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
  },
};

export default config;
