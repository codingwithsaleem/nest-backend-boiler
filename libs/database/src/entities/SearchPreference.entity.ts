import { IndustryEntity } from '@app/database/entities/Industry.entity';
import { JobEntity } from '@app/database/entities/Job.entity';
import { RegionEntity } from '@app/database/entities/Region.entity';
import { UserEntity } from '@app/database/entities/User.entity';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { ContractType } from '@app/database/enums/ContractType.enums';
// import { Currency } from '@app/database/enums/Currency.enum';
import { ExperienceLevel } from '@app/database/enums/ExperienceLevel.enums';
import { JobseekerStatus } from '@app/database/enums/JobseekerStatus.enums';
import { Visa } from '@app/database/enums/Visa.enums';
import { Travel } from '@app/database/enums/Travel.enums';
import { SearchPreferenceRepository } from '@app/database/repositories/SearchPreference.repository';
import {
  Iso6391LanguageCode,
  Iso6391LanguageCodeToLanguageName,
} from '@app/shared/enums/Language.enum';
import {
  ArrayType,
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToOne,
  Property,
  Rel,
} from '@mikro-orm/core';
import { CompanySize } from '../enums/CompanySize.enums';

@Entity({
  tableName: 'search_preference',
  customRepository: () => SearchPreferenceRepository,
})
export class SearchPreferenceEntity extends BaseEntity {
  [EntityRepositoryType]? = SearchPreferenceRepository;

  /*
   * The user id that owns the search preference.
   */
  @OneToOne({
    entity: () => UserEntity,
    name: 'user',
    onDelete: 'CASCADE',
  })
  user!: Rel<UserEntity>;

  /*
   * The contract type. For instance Full-time, Contractor, Internship, etc.
   */
  @Property({
    name: 'contract_type',
    type: ArrayType<ContractType>,
    nullable: true,
  })
  contractType?: ContractType[];

  /*
   * The experience level. For instance Internship, Entry-level, Junior, etc.
   */
  @Property({
    name: 'experience_level',
    type: ArrayType<ExperienceLevel>,
  })
  experienceLevel: ExperienceLevel[];

  /*
   * The minumum salary.
   */
  @Property({
    name: 'min_salary',
    type: 'numeric',
    precision: 10,
    nullable: true,
  })
  minSalary?: number;

  // @Enum({
  //   name: 'currency',
  //   type: 'varchar',
  //   items: () => Currency,
  //   nullable: true,
  // })
  // currency: Currency;

  @Property({ name: 'currency', type: 'varchar', nullable: true })
  currency: string;

  /*
   * The industries that the user is interested in.
   */
  @ManyToMany({
    entity: () => IndustryEntity,
    name: 'industries',
  })
  industries = new Collection<IndustryEntity>(this);

  /*
   * Locations where the user would like to work.
   */
  @ManyToMany({
    entity: () => RegionEntity,
    name: 'locations',
  })
  locations = new Collection<RegionEntity>(this);

  /*
   * Jobs that the user is interested in.
   */
  @ManyToMany({
    entity: () => JobEntity,
    name: 'jobs',
  })
  jobs = new Collection<JobEntity>(this);

  /*
   * If the user need a visa or not and which type.
   */
  @Property({ name: 'visa', type: ArrayType<Visa>, nullable: true })
  visa?: Visa[];

  /*
   * The travel time to reach work place.
   */
  @Property({
    name: 'travel',
    type: ArrayType<Travel>,
    nullable: true,
  })
  travel?: Travel[];

  /*
   * The languages that the user speaks.
   */
  @Property({
    name: 'languages_code',
    type: ArrayType<Iso6391LanguageCode>,
    nullable: true,
  })
  languagesCode?: Iso6391LanguageCode[];

  /**
   * How actively the user is looking for a new job.
   */
  @Property({
    name: 'job_quitting_time',
    type: ArrayType<JobseekerStatus>,
    nullable: true,
  })
  jobseekerStatus?: JobseekerStatus[];

  @Property({ name: 'values', type: ArrayType<string>, nullable: true })
  values?: string[];

  @Property({ name: 'company_size', type: ArrayType<string>, nullable: true })
  companySize?: CompanySize[];

  /****************************** GETTERS ************************************/

  /**
   * Returns the languages in literal format based on the ISO6391LanguageCode code.
   * @returns The languages in literal format or null if not defined.
   */
  @Property({ persist: false })
  public get languages(): Iso6391LanguageCodeToLanguageName[] | null {
    if (!this.languagesCode) {
      return null;
    }
    return this.languagesCode.map(code => Iso6391LanguageCodeToLanguageName[code]);
  }
}
