import { AdminEntity } from '@app/database/entities/Admin.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { hash } from 'bcrypt';

export class AdminSeeder extends Seeder {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  async run(em: EntityManager, context: Dictionary) {
    context.nicolas = await em.upsert(AdminEntity, {
      email: 'nicolas@reskue.tech',
      password: await hash('*25greeka24*', 10),
    });
    context.tom = await em.upsert(AdminEntity, {
      email: 'tom@reskue.art',
      password: await hash('*25greeka24*', 10),
    });
    context.eric = await em.upsert(AdminEntity, {
      email: 'eric@reskue.tech',
      password: await hash('*25greeka24*', 10),
    });
    context.rodolphe = await em.upsert(AdminEntity, {
      email: 'rodolphe@reskue.tech',
      password: await hash('*25greeka24*', 10),
    });
    context.matt = await em.upsert(AdminEntity, {
      email: 'matt@greeka.com',
      password: await hash('*25greeka24*', 10),
    });
    context.igor = await em.upsert(AdminEntity, {
      email: 'igor.lapaj@gmail.com',
      password: await hash('*25greeka24*', 10),
    });
  }
}
