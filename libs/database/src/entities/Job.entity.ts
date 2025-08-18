import { JobGroupEntity } from '@app/database/entities/JobGroup.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { JobRepository } from '@app/database/repositories/Job.repository';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity({
  tableName: 'job',
  customRepository: () => JobRepository,
})
@Unique({ properties: ['name', 'group'] })
export class JobEntity extends BaseEntity {
  [EntityRepositoryType]?: JobRepository;

  @Property({ name: 'name', type: 'varchar' })
  name!: string;

  @Property({ name: 'job_available', type: 'boolean', default: true })
  jobAvailable: boolean = true;

  @ManyToOne({ entity: () => JobGroupEntity, name: 'job_group', onDelete: 'cascade' })
  group!: JobGroupEntity;
}
