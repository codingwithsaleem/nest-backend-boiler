import { JobPostEntity } from '@app/database/entities/JobPost.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class PublicJobPostRepository extends CrudRepository<JobPostEntity> {}
