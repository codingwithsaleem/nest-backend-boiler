import { IndustryGroupEntity } from '@app/database/entities/IndustryGroup.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class IndustryGroupRepository extends CrudRepository<IndustryGroupEntity> {}
