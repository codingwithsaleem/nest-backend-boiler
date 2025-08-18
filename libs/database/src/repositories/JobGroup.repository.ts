import { JobGroupEntity } from '@app/database/entities/JobGroup.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class JobGroupRepository extends CrudRepository<JobGroupEntity> {}
