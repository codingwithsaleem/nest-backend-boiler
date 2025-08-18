import { SocialMediaEmbeddable } from '@app/database/embeddables/SocialMedia.embeddable';
import { SearchPreferenceEntity } from '@app/database/entities/SearchPreference.entity';
import { AuthenticatedEntity } from '@app/database/entities/abstract/Authenticated.entity';
import { UserRepository } from '@app/database/repositories/User.repository';
import { ISO31661Alpha2, ISO31661Alpha2ToCountryName } from '@app/shared';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  Property,
  OneToOne,
  Rel,
  Embedded,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { UserSkippedJobEntity } from './UserSkippedJob.entity';
import { UserSavedJobEntity } from './UserSavedJob.entity';
import { UserAppliedJobEntity } from './UserAppliedJob.entity';

@Entity({
  tableName: 'user',
  customRepository: () => UserRepository,
})
export class UserEntity extends AuthenticatedEntity {
  static readonly AUTH_ENTITY_NAME = 'UserEntity';

  [EntityRepositoryType]?: UserRepository;

  @Property({ name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Property({ name: 'last_name', type: 'varchar' })
  lastName!: string;

  @Embedded({ entity: () => SocialMediaEmbeddable, type: 'jsonb', nullable: true })
  socialMedia?: SocialMediaEmbeddable;

  @Enum({
    name: 'country_code',
    type: 'varchar',
    items: () => ISO31661Alpha2,
    nullable: true,
  })
  countryCode?: ISO31661Alpha2;

  @OneToOne(() => SearchPreferenceEntity, {
    inversedBy: 'user',
    owner: true,
    orphanRemoval: true,
    nullable: true,
  })
  searchPreference?: Rel<SearchPreferenceEntity>;

  @OneToMany(() => UserSkippedJobEntity, userSkippedJob => userSkippedJob.user)
  skippedByUsers = new Collection<UserSkippedJobEntity>(this);

  @OneToMany(() => UserSavedJobEntity, userSavedJob => userSavedJob.user)
  savedByUsers = new Collection<UserSavedJobEntity>(this);

  @OneToMany(() => UserAppliedJobEntity, userAppliedJob => userAppliedJob.user)
  appliedByUsers = new Collection<UserAppliedJobEntity>(this);

  /****************************** GETTERS ************************************/

  /**
   * Returns the country name in literal format based on the ISO31661Alpha2 code.
   * @returns The country name in literal format.
   */
  @Property({ persist: false })
  public get country(): ISO31661Alpha2ToCountryName {
    return ISO31661Alpha2ToCountryName[this.countryCode];
  }

  /**
   * Backup email
   * @returns -
   */
  @Property({ persist: true })
  public get backupEmail(): string {
    return this.email;
  }
}
