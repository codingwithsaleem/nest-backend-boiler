import { AdminSeeder } from '@app/database/seeders/Admin.seeder';
import { IndustrySeeder } from '@app/database/seeders/Industry.seeder';
import { IndustryGroupSeeder } from '@app/database/seeders/IndustryGroup.seeder';
import { JobSeeder } from '@app/database/seeders/Job.seeder';
import { JobGroupSeeder } from '@app/database/seeders/JobGroup.seeder';
import { RegionSeeder } from '@app/database/seeders/Region.seeder';
import { RegionGroupSeeder } from '@app/database/seeders/RegionGroup.seeder';
import { RegionStateSeeder } from '@app/database/seeders/RegionState.seeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  async run(em: EntityManager) {
    await this.call(em, [
      AdminSeeder,
      IndustryGroupSeeder,
      IndustrySeeder,
      JobGroupSeeder,
      JobSeeder,
      RegionGroupSeeder,
      RegionStateSeeder,
      RegionSeeder,
    ]);
  }
}
