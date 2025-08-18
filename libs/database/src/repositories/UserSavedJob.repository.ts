import { UserSavedJobEntity } from '@app/database/entities/UserSavedJob.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class UserSavedJobRepository extends CrudRepository<UserSavedJobEntity> {}
