import { BaseEntity } from '@app/database/entities/abstract/Base.entity';
import { Entity, Index, Property } from '@mikro-orm/core';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class AuthenticatedEntity extends BaseEntity {
  /**
   * Entity's email
   */
  @Property({ name: 'email', type: 'varchar', unique: true, nullable: true })
  @Index()
  email?: string;

  /**
   * Entity's password
   */
  @ApiHideProperty()
  @Property({ name: 'password', type: 'varchar', hidden: true, nullable: true })
  password?: string;

  /**
   * Refresh token needed for authentication
   */
  @ApiHideProperty()
  @Property({
    name: 'refresh_token',
    type: 'varchar',
    nullable: true,
    hidden: true,
  })
  refreshToken?: string;

  /**
   * Determines if user has TFA enabled or not.
   */
  @ApiHideProperty()
  @Property({
    name: 'tfa_enabled',
    type: 'boolean',
    hidden: true,
    default: false,
  })
  TFAEnabled = false;

  /**
   * TFA secret if enabled
   */
  @ApiHideProperty()
  @Property({
    name: 'tfa_secret',
    type: 'varchar',
    nullable: true,
    hidden: true,
  })
  TFASecret?: string;

  /**
   * TFA recovery words if enabled
   */
  @ApiHideProperty()
  @Property({
    name: 'tfa_recovery_words',
    type: 'text',
    nullable: true,
    hidden: true,
  })
  TFARecoveryWords?: string;
}
