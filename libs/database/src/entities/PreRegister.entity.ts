import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { PreRegisterRepository } from '@app/database/repositories/PreRegister.repository';
import { ISO31661Alpha2, ISO31661Alpha2ToCountryName } from '@app/shared';
import { Entity, EntityRepositoryType, Enum, Index, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'pre_register',
  customRepository: () => PreRegisterRepository,
})
export class PreRegisterEntity extends BaseEntity {
  [EntityRepositoryType]?: PreRegisterRepository;

  @Property({ name: 'name', type: 'varchar' })
  name!: string;

  @Property({ name: 'companyName', type: 'varchar' })
  companyName!: string;

  @Property({ name: 'email', type: 'varchar', unique: true })
  @Index()
  email!: string;

  @Property({ name: 'website', type: 'varchar' })
  website!: string;

  @Enum({
    name: 'country_code',
    type: 'varchar',
    items: () => ISO31661Alpha2,
  })
  countryCode!: ISO31661Alpha2;

  @Property({ name: 'newsletter', type: 'boolean' })
  newsletter!: boolean;

  /****************************** GETTERS ************************************/

  /**
   * Returns the country name in literal format based on the ISO31661Alpha2 code.
   * @returns The country name in literal format.
   */
  @Property({ persist: false })
  public get country(): ISO31661Alpha2ToCountryName {
    if (!this.countryCode) {
      return null;
    }
    return ISO31661Alpha2ToCountryName[this.countryCode];
  }
}
