import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { ExperienceLevel } from '@app/database/enums/ExperienceLevel.enums';

@Entity()
export class PublicJobsMeta extends BaseEntity {
  @Property()
  categoryName: string;

  @Property()
  metaTitle: string;

  @Property()
  h1: string;

  @Property()
  h2: string;

  @Property()
  metaDescription: string;

  @Property()
  keywords: string;

  @Property({ type: 'array' })
  regions: string[];

  @Property({ type: 'array' })
  roles: string[];

  @Property({ type: 'array' })
  industries: string[];

  @Enum({
    name: 'experience_level',
    type: 'varchar',
    items: () => ExperienceLevel,
    array: true,
  })
  experienceLevels!: ExperienceLevel[];

  @Property()
  @Unique()
  slug: string;
}
