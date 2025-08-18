import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { RegionRepository } from '@app/database/repositories/Region.repository';
import { RegionStateEntity } from '@app/database/entities/RegionState.entity';
import {
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity({
  tableName: 'region',
  customRepository: () => RegionRepository,
})
@Unique<RegionEntity>({ properties: ['name', 'group', 'state'] })
export class RegionEntity extends BaseEntity {
  [EntityRepositoryType]?: RegionRepository;

  @Property({ name: 'name', type: 'varchar' })
  @Index()
  name!: string;

  @Property({ name: 'job_available', type: 'boolean', default: true })
  jobAvailable: boolean = true;

  @ManyToOne({
    entity: () => RegionGroupEntity,
    name: 'region_group',
    nullable: true,
    onDelete: 'cascade',
  })
  group?: RegionGroupEntity;

  // Link to RegionState
  @ManyToOne({
    entity: () => RegionStateEntity,
    name: 'region_state',
    nullable: true,
    onDelete: 'cascade',
  })
  state?: RegionStateEntity;
}
