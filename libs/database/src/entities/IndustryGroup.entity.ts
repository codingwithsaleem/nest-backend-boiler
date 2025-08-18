import { IndustryEntity } from '@app/database/entities/Industry.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { IndustryGroupRepository } from '@app/database/repositories/IndustryGroup.repository';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
} from '@mikro-orm/core';

@Entity({
  tableName: 'industry_group',
  customRepository: () => IndustryGroupRepository,
})
export class IndustryGroupEntity extends BaseEntity {
  [EntityRepositoryType]?: IndustryGroupRepository;

  @Property({ name: 'name', type: 'varchar', unique: true })
  name!: string;

  @OneToMany({
    entity: () => IndustryEntity,
    mappedBy: i => i.group,
    name: 'industries',
    orphanRemoval: true,
  })
  industries = new Collection<IndustryEntity>(this);
}
