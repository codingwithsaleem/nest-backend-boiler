import { Entity, EntityRepositoryType, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { UserAppliedJobRepository } from '@app/database/repositories/UserAppliedJob.repository';

@Entity({
  tableName: 'user_applied_jobs',
  customRepository: () => UserAppliedJobRepository,
})
export class UserAppliedJobEntity extends BaseEntity {
  [EntityRepositoryType]?: UserAppliedJobRepository;

  @ManyToOne({ entity: () => 'UserEntity', onDelete: 'cascade' })
  user!: any;

  @ManyToOne({ entity: () => 'JobPostEntity', onDelete: 'cascade', lazy: true })
  jobPost!: any;
}
