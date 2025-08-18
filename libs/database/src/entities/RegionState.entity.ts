// import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { RegionEntity } from '@app/database/entities/Region.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { RegionStateRepository } from '@app/database';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity({
  tableName: 'region_state',
  customRepository: () => RegionStateRepository,
})
@Unique<RegionStateEntity>({ properties: ['name', 'group'] })
export class RegionStateEntity extends BaseEntity {
  [EntityRepositoryType]?: RegionStateRepository;

  @Property({ name: 'name', type: 'varchar' })
  @Index()
  name!: string;

  @ManyToOne({
    entity: () => 'RegionGroupEntity',
    name: 'region_group',
    onDelete: 'cascade',
    lazy: true,
  })
  group!: any;

  @OneToMany({
    entity: () => RegionEntity,
    mappedBy: region => region.state,
    name: 'regions',
    orphanRemoval: true,
    lazy: true,
  })
  regions = new Collection<RegionEntity>(this);
}
