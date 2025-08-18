import { RegionEntity } from '@app/database/entities/Region.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class RegionRepository extends CrudRepository<RegionEntity> {}
