import { AdminEntity } from '@app/database/entities/Admin.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class AdminRepository extends CrudRepository<AdminEntity> {}
