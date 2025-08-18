import { SocialMediaEmbeddable } from '@app/database/embeddables/SocialMedia.embeddable';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { JobPostEntity } from '@app/database/entities/JobPost.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { RecruiterFirmRepository } from '@app/database/repositories/RecruiterFirm.repository';
import {
  Collection,
  Embedded,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
} from '@mikro-orm/core';

@Entity({
  tableName: 'recruiter_firm',
  customRepository: () => RecruiterFirmRepository,
})
export class RecruiterFirmEntity extends BaseEntity {
  [EntityRepositoryType]?: RecruiterFirmRepository;

  @Property({ name: 'firm_name', type: 'varchar', unique: true })
  firmName!: string;

  @Property({ name: 'firm_overview', type: 'text' })
  firmOverview!: string;

  @Embedded(() => PublicFileEmbeddable, { object: true, nullable: true })
  logo?: PublicFileEmbeddable;

  @Embedded({ entity: () => SocialMediaEmbeddable, type: 'jsonb', nullable: true })
  socialMedia?: SocialMediaEmbeddable;

  @OneToMany({
    entity: () => JobPostEntity,
    mappedBy: jp => jp.recruiterFirm,
    name: 'jobPosts',
    orphanRemoval: true,
  })
  jobPosts = new Collection<JobPostEntity>(this);
}
