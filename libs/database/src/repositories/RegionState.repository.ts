import { RegionStateEntity } from '@app/database/entities/RegionState.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class RegionStateRepository extends CrudRepository<RegionStateEntity> {}
