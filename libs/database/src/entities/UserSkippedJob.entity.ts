import { Entity, EntityRepositoryType, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { UserSkippedJobRepository } from '@app/database/repositories/UserSkippedJob.repository';

@Entity({
  tableName: 'user_skipped_jobs',
  customRepository: () => UserSkippedJobRepository,
})
export class UserSkippedJobEntity extends BaseEntity {
  [EntityRepositoryType]?: UserSkippedJobRepository;

  @ManyToOne({ entity: () => 'UserEntity', onDelete: 'cascade' })
  user!: any;

  @ManyToOne({ entity: () => 'JobPostEntity', onDelete: 'cascade', lazy: true })
  jobPost!: any;
}
