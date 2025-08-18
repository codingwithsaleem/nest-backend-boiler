import { JobEntity } from '@app/database/entities/Job.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class JobRepository extends CrudRepository<JobEntity> {}
