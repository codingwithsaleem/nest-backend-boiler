// RegionGroup.seeder.ts
import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class RegionGroupSeeder extends Seeder {
  // eslint-disable-next-line jsdoc/require-jsdoc
  async run(em: EntityManager, context: Dictionary<RegionGroupEntity>) {
    // Initialize the context object if it's not already initialized
    if (!context) {
      context = {};
    }
    context.newZealand = await em.upsert(RegionGroupEntity, {
      name: 'New Zealand',
    });
    context.singapore = await em.upsert(RegionGroupEntity, {
      name: 'Singapore',
    });
    context.unitedStates = await em.upsert(RegionGroupEntity, {
      name: 'United States',
    });
    context.australia = await em.upsert(RegionGroupEntity, {
      name: 'Australia',
    });
    context.canada = await em.upsert(RegionGroupEntity, {
      name: 'Canada',
    });
    context.middleEastGulfStates = await em.upsert(RegionGroupEntity, {
      name: 'Middle East Gulf States',
    });
    context.remote = await em.upsert(RegionGroupEntity, {
      name: 'Remote',
    });
    context.wales = await em.upsert(RegionGroupEntity, {
      name: 'Wales',
    });
    context.scotland = await em.upsert(RegionGroupEntity, {
      name: 'Scotland',
    });
    context.ireland = await em.upsert(RegionGroupEntity, {
      name: 'Ireland',
    });
    context.england = await em.upsert(RegionGroupEntity, {
      name: 'England',
    });
  }
}
