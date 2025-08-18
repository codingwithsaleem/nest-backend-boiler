import { UserSkippedJobEntity } from '@app/database/entities/UserSkippedJob.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class UserSkippedJobRepository extends CrudRepository<UserSkippedJobEntity> {}
