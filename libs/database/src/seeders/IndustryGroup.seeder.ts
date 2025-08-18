import { IndustryGroupEntity } from '@app/database/entities/IndustryGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class IndustryGroupSeeder extends Seeder {
  // eslint-disable-next-line jsdoc/require-jsdoc
  async run(em: EntityManager, context: Dictionary<IndustryGroupEntity>) {
    context.digitalInfrastructure = await em.upsert(IndustryGroupEntity, {
      name: 'Digital Infrastructure',
    });

    context.buildingsAndPlaces = await em.upsert(IndustryGroupEntity, {
      name: 'Buildings & Places',
    });

    context.waterAndEnvironmental = await em.upsert(IndustryGroupEntity, {
      name: 'Water + Environmental',
    });

    context.transportInfrastructure = await em.upsert(IndustryGroupEntity, {
      name: 'Transport Infrastructure',
    });

    context.generatingEnergy = await em.upsert(IndustryGroupEntity, {
      name: 'Generating Energy',
    });

    context.movingEnergy = await em.upsert(IndustryGroupEntity, {
      name: 'Moving Energy',
    });
  }
}
