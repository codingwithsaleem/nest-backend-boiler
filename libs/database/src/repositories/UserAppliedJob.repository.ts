import { UserAppliedJobEntity } from '@app/database/entities/UserAppliedJob.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class UserAppliedJobRepository extends CrudRepository<UserAppliedJobEntity> {}
