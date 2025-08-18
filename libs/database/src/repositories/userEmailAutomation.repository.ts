import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';
import { UserEmailAutomation } from '../entities/user-email-automation.entity';

export class userEmailAutomationRepository extends CrudRepository<UserEmailAutomation> {}
