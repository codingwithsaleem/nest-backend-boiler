import { CompanyEntity } from '@app/database/entities/Company.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class CompanyRepository extends CrudRepository<CompanyEntity> {}
