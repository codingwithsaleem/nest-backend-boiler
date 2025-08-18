import { PreRegisterEntity } from '@app/database/entities/PreRegister.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class PreRegisterRepository extends CrudRepository<PreRegisterEntity> {}
