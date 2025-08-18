import { Entity, EntityRepositoryType, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { UserSavedJobRepository } from '../repositories/UserSavedJob.repository';

@Entity({
  tableName: 'user_saved_jobs',
  customRepository: () => UserSavedJobRepository,
})
export class UserSavedJobEntity extends BaseEntity {
  [EntityRepositoryType]?: UserSavedJobRepository;

  @ManyToOne({ entity: () => 'UserEntity', onDelete: 'cascade' })
  user!: any;

  @ManyToOne({ entity: () => 'JobPostEntity', onDelete: 'cascade', lazy: true })
  jobPost!: any;
}
