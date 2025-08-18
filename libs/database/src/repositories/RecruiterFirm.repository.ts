import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class RecruiterFirmRepository extends CrudRepository<RecruiterFirmEntity> {}
