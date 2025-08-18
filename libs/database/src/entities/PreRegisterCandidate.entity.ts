import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { PreRegisterCandidateRepository } from '@app/database/repositories/PreRegisterCandidate.repository';
import { Entity, EntityRepositoryType, Index, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'pre_register_candidate',
  customRepository: () => PreRegisterCandidateRepository,
})
export class PreRegisterCandidateEntity extends BaseEntity {
  [EntityRepositoryType]?: PreRegisterCandidateRepository;

  @Property({ name: 'name', type: 'varchar' })
  name!: string;

  @Property({ name: 'email', type: 'varchar', unique: true })
  @Index()
  email!: string;

  @Property({ name: 'linkedin', type: 'varchar' })
  linkedin!: string;

  @Property({ name: 'profession', type: 'varchar' })
  profession!: string;

  @Property({ name: 'newsletter', type: 'boolean' })
  newsletter!: boolean;
}
