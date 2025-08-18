import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class RegionGroupRepository extends CrudRepository<RegionGroupEntity> {}
