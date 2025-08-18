import { JobEntity } from '@app/database/entities/Job.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { JobGroupRepository } from '@app/database/repositories/JobGroup.repository';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
} from '@mikro-orm/core';

@Entity({
  tableName: 'job_group',
  customRepository: () => JobGroupRepository,
})
export class JobGroupEntity extends BaseEntity {
  [EntityRepositoryType]?: JobGroupRepository;

  @Property({ name: 'name', type: 'varchar', unique: true })
  name!: string;

  @OneToMany({
    entity: () => JobEntity,
    mappedBy: job => job.group,
    name: 'jobs',
    orphanRemoval: true,
  })
  jobs = new Collection<JobEntity>(this);
}
