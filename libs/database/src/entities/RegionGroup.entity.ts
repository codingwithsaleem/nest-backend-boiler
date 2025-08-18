import { RegionEntity } from '@app/database/entities/Region.entity';
import { RegionStateEntity } from '@app/database/entities/RegionState.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { RegionGroupRepository } from '@app/database/repositories/RegionGroup.repository';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
} from '@mikro-orm/core';

@Entity({
  tableName: 'region_group',
  customRepository: () => RegionGroupRepository,
})
export class RegionGroupEntity extends BaseEntity {
  [EntityRepositoryType]?: RegionGroupRepository;

  @Property({ name: 'name', type: 'varchar', unique: true })
  name!: string;

  @Property({ name: 'country_code', type: 'varchar', unique: true })
  countryCode!: string;

  @OneToMany({
    entity: () => RegionEntity,
    mappedBy: region => region.group,
    name: 'regions',
    orphanRemoval: true,
  })
  regions = new Collection<RegionEntity>(this);

  // New relationship with states
  @OneToMany({
    entity: () => RegionStateEntity,
    mappedBy: state => state.group,
    name: 'states',
    orphanRemoval: true,
  })
  states = new Collection<RegionStateEntity>(this);
}
