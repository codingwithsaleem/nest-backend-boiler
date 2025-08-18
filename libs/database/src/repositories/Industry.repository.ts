import { IndustryEntity } from '@app/database/entities/Industry.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class IndustryRepository extends CrudRepository<IndustryEntity> {}
