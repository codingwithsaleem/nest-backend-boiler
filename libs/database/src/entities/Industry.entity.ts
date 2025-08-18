import { IndustryGroupEntity } from '@app/database/entities/IndustryGroup.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { IndustryRepository } from '@app/database/repositories/Industry.repository';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity({
  tableName: 'industry',
  customRepository: () => IndustryRepository,
})
@Unique<IndustryEntity>({ properties: ['group', 'name'] })
export class IndustryEntity extends BaseEntity {
  [EntityRepositoryType]?: IndustryRepository;

  @Property({ name: 'name', type: 'varchar' })
  name!: string;

  @ManyToOne({
    entity: () => IndustryGroupEntity,
    name: 'group',
    onDelete: 'cascade',
  })
  group: IndustryGroupEntity;
}
