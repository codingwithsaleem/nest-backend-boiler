import { PreRegisterCandidateEntity } from '@app/database/entities/PreRegisterCandidate.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class PreRegisterCandidateRepository extends CrudRepository<PreRegisterCandidateEntity> {}
