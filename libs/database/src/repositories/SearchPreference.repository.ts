import { SearchPreferenceEntity } from '@app/database/entities/SearchPreference.entity';
import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';

export class SearchPreferenceRepository extends CrudRepository<SearchPreferenceEntity> {}
