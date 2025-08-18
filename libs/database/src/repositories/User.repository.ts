import { UserEntity } from '@app/database/entities/User.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class UserRepository extends CrudRepository<UserEntity> {}
