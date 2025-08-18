import { CompanyEntity } from '@app/database/entities/Company.entity';
import { IndustryEntity } from '@app/database/entities/Industry.entity';
import { JobEntity } from '@app/database/entities/Job.entity';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { RegionEntity } from '@app/database/entities/Region.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { ContractType } from '@app/database/enums/ContractType.enums';
// import { Currency } from '@app/database/enums/Currency.enum';
import { ExperienceLevel } from '@app/database/enums/ExperienceLevel.enums';
import { JobPostRepository } from '@app/database/repositories/JobPost.repository';
import {
  ArrayType,
  Collection,
  Embedded,
  Entity,
  EntityRepositoryType,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
  Unique,
} from '@mikro-orm/core';
import { SocialMediaEmbeddable } from '../embeddables/SocialMedia.embeddable';
import { UserSkippedJobEntity } from './UserSkippedJob.entity';
import { UserSavedJobEntity } from './UserSavedJob.entity';
import { UserAppliedJobEntity } from './UserAppliedJob.entity';
import { CompanySize } from '../enums/CompanySize.enums';

@Entity({
  tableName: 'job_post',
  customRepository: () => JobPostRepository,
})
@Unique<JobPostEntity>({ properties: ['company', 'title', 'contractType', 'url'] })
export class JobPostEntity extends BaseEntity {
  [EntityRepositoryType]? = JobPostRepository;

  //############################################################################
  //Overview Section
  //############################################################################
  @ManyToOne(() => CompanyEntity, {
    name: 'company',
    onDelete: 'cascade',
    nullable: true,
    eager: true,
  })
  @Index()
  company?: Rel<CompanyEntity>;

  @ManyToOne(() => RecruiterFirmEntity, {
    name: 'recruiter',
    onDelete: 'cascade',
    nullable: true,
    eager: true,
  })
  @Index()
  recruiterFirm?: Rel<RecruiterFirmEntity>;

  @Property({ name: 'title', type: 'varchar' })
  title!: string;

  @Property({ name: 'url', type: 'varchar' })
  url!: string;

  @Enum({
    name: 'contract_type',
    type: 'varchar',
    items: () => ContractType,
    nullable: true,
  })
  contractType?: ContractType;

  @Enum({ name: 'experience_level', type: 'varchar', items: () => ExperienceLevel })
  experienceLevel!: ExperienceLevel;

  @Property({ name: 'role_focus', type: 'varchar', nullable: true })
  roleFocus!: string;

  @Property({ name: 'location', type: 'varchar' })
  location!: string;

  @Property({ name: 'date_range', type: 'varchar', nullable: true })
  dateRange?: string;

  // @Enum({ name: 'currency', type: 'varchar', items: () => Currency, nullable: true })
  @Property({ name: 'currency', type: 'varchar' })
  currency: string;

  @Property({ name: 'min_salary', type: 'numeric', precision: 10, nullable: true })
  minSalary!: number;

  @Property({ name: 'max_salary', type: 'numeric', precision: 10, nullable: true })
  maxSalary?: number;

  @Property({ name: 'work_environment', type: 'varchar', nullable: true })
  workEnvironment?: string;

  /*
   * Company One Line Overview - This field overrides the company one line overview field in the company entity
   */
  @Property({ name: 'company_one_line_overview', type: 'varchar', nullable: true })
  companyOneLineOverview?: string;

  //############################################################################
  //Overview Section - Additionals options when jobpost is create by recruiter
  //############################################################################

  @Property({ name: 'service_specialisms', type: ArrayType<string>, nullable: true })
  serviceSpecialisms: string[];

  @Property({ name: 'sector_specialisms', type: ArrayType<string>, nullable: true })
  sectorSpecialisms: string[];

  @Property({ name: 'nb_of_employees', type: 'varchar', nullable: true })
  nbOfEmployees?: string;

  //############################################################################

  //############################################################################
  //Body Section
  //############################################################################
  @Property({ name: 'what_you_bring', type: 'text', nullable: true })
  whatYouBring!: string;

  @Property({ name: 'tasks', type: 'text', nullable: true })
  tasks!: string;

  @Property({ name: 'benefits', type: 'text', nullable: true })
  benefits?: string;

  @Property({ name: 'training_development', type: 'text', nullable: true })
  trainingDevelopment?: string;

  @Property({ name: 'interview_process', type: 'text', nullable: true })
  interviewProcess?: string;

  @Property({ name: 'visa_sponsorchip', type: 'text', nullable: true })
  visaSponsorchip?: string;

  @Property({ name: 'security_clearance', type: 'text', nullable: true })
  securityClearance?: string;
  /*
   * Company Overview - This field overrides the company overview field in the company entity
   */
  @Property({ name: 'company_overview', type: 'text', nullable: true })
  companyOverview?: string;

  //############################################################################
  //Body Section - Additionals options when jobpost is create by recruiter
  //############################################################################

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

  @Property({ name: 'recruiter_overview', type: 'text', nullable: true })
  recruiterOverview?: string;

  @Embedded({ entity: () => SocialMediaEmbeddable, type: 'jsonb', nullable: true })
  recruiterSocialMedia?: SocialMediaEmbeddable;

  @Embedded({ entity: () => SocialMediaEmbeddable, type: 'jsonb', nullable: true })
  recruiterFirmSocialMedia?: SocialMediaEmbeddable;

  @Property({ name: 'company_size', type: ArrayType<string>, nullable: true })
  companySize?: CompanySize[] = [
    CompanySize.SMALL,
    CompanySize.MEDIUM,
    CompanySize.LARGE,
  ];

  //############################################################################
  //JobPost fetched from dynamoDB
  //############################################################################

  @Property({ name: 'dynamo_url', type: 'varchar', nullable: true })
  dynamoUrl?: string;

  //############################################################################
  //Additionals fields
  //############################################################################

  @Property({ type: 'int', nullable: true })
  expirationDays?: number = 30;

  @Property({ type: 'date', nullable: true })
  expiryDate?: Date;

  //############################################################################
  //Field not meant to be displayed, Only for Matching Algorithm
  //############################################################################
  /*
   * Jobs types linked to the jobPost (for instance, engineer)
   */
  @ManyToMany({ entity: () => JobEntity, name: 'role', eager: true })
  role = new Collection<JobEntity>(this);

  @ManyToMany({ entity: () => IndustryEntity, name: 'industry', eager: true })
  industry = new Collection<IndustryEntity>(this);

  @ManyToMany({ entity: () => RegionEntity, name: 'region', eager: true })
  region = new Collection<RegionEntity>(this);
  //############################################################################

  @OneToMany(() => UserSkippedJobEntity, userSkippedJob => userSkippedJob.jobPost)
  skippedByUsers = new Collection<UserSkippedJobEntity>(this);

  @OneToMany(() => UserSavedJobEntity, userSavedJob => userSavedJob.jobPost)
  savedByUsers = new Collection<UserSavedJobEntity>(this);

  @OneToMany(() => UserAppliedJobEntity, userAppliedJob => userAppliedJob.jobPost)
  appliedByUsers = new Collection<UserAppliedJobEntity>(this);
}
