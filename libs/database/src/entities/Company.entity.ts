import { ExternalLinkEmbeddable } from '@app/database/embeddables/ExternalLink.embeddable';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { JobPostEntity } from '@app/database/entities/JobPost.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { CompanyRepository } from '@app/database/repositories/Company.repository';
import {
  ArrayType,
  Collection,
  Embedded,
  Entity,
  EntityRepositoryType,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { CompanySize } from '../enums/CompanySize.enums';

@Entity({
  tableName: 'company',
  customRepository: () => CompanyRepository,
})
export class CompanyEntity extends BaseEntity {
  [EntityRepositoryType]?: CompanyRepository;

  @Property({ name: 'name', type: 'varchar', unique: true })
  name!: string;

  @Embedded(() => PublicFileEmbeddable, { object: true, nullable: true })
  logo?: PublicFileEmbeddable;

  @OneToMany({
    entity: () => JobPostEntity,
    mappedBy: jp => jp.company,
    name: 'jobPosts',
    orphanRemoval: true,
  })
  jobPosts = new Collection<JobPostEntity>(this);

  @Property({ name: 'website', type: 'varchar', nullable: true })
  website?: string;

  @Property({ name: 'email', type: 'varchar' })
  email: string;

  @Property({ name: 'one_line_overview', type: 'text' })
  oneLineOverview: string;

  @Property({ name: 'nb_of_employees', type: 'varchar', nullable: true })
  nbOfEmployees?: string;

  @Property({ name: 'service_specialisms', type: ArrayType<string>, nullable: true })
  serviceSpecialisms: string[];

  @Property({ name: 'sector_specialisms', type: ArrayType<string>, nullable: true })
  sectorSpecialisms: string[];

  @Property({ name: 'overview', type: 'text' })
  overview: string;

  @Property({ name: 'culture_values', type: 'text', nullable: true })
  cultureValues?: string;

  @Property({
    name: 'environment_sustainability',
    type: 'text',
    nullable: true,
  })
  environmentSustainability?: string;

  @Property({
    name: 'inclusion_diversity',
    type: 'text',
    nullable: true,
  })
  inclusionDiversity?: string;

  @Property({ name: 'company_size', type: ArrayType<string>, nullable: true })
  companySize?: CompanySize[] = [
    CompanySize.SMALL,
    CompanySize.MEDIUM,
    CompanySize.LARGE,
  ];

  //@Property({ name: 'glassdoor_rating', type: 'bigint', nullable: true })
  //glassdoorRating?: number;

  @Embedded(() => ExternalLinkEmbeddable, { nullable: true, array: true })
  externalLinks?: ExternalLinkEmbeddable[];
}
