import { JobGroupEntity } from '@app/database/entities/JobGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class JobGroupSeeder extends Seeder {
  // eslint-disable-next-line
  async run(em: EntityManager, context: Dictionary<JobGroupEntity>) {
    context.technician = await em.upsert(JobGroupEntity, {
      name: 'Technician',
    });

    context.engineering = await em.upsert(JobGroupEntity, {
      name: 'Engineering',
    });

    context.environmental = await em.upsert(JobGroupEntity, {
      name: 'Environmental',
    });

    context.sustainability = await em.upsert(JobGroupEntity, {
      name: 'Sustainability',
    });

    context.bimDesign = await em.upsert(JobGroupEntity, {
      name: 'BIM + Design',
    });

    context.projectManagement = await em.upsert(JobGroupEntity, {
      name: 'Project Management',
    });

    context.admin = await em.upsert(JobGroupEntity, {
      name: 'Admin',
    });

    context.geomatics = await em.upsert(JobGroupEntity, {
      name: 'Geomatics',
    });

    context.masterPlanning = await em.upsert(JobGroupEntity, {
      name: 'Master Planning',
    });

    context.commercialManagement = await em.upsert(JobGroupEntity, {
      name: 'Commercial Management',
    });

    context.bdBids = await em.upsert(JobGroupEntity, {
      name: 'BD + Bids',
    });

    context.data = await em.upsert(JobGroupEntity, {
      name: 'Data',
    });

    context.tradesOperators = await em.upsert(JobGroupEntity, {
      name: 'Trades + Operators',
    });

    context.architecture = await em.upsert(JobGroupEntity, {
      name: 'Architecture',
    });

    context.corporate = await em.upsert(JobGroupEntity, {
      name: 'Corporate',
    });

    context.constructionManagement = await em.upsert(JobGroupEntity, {
      name: 'Construction Management',
    });
  }
}
