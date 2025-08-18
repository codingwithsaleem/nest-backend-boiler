import { ISO31661Alpha2, ISO31661Alpha2ToCountryName, SanitizeEmail } from '@app/shared';
import { Exclude, Type } from 'class-transformer';
import { SocialMediaEmbeddableDto } from '@app/database/dtos/SocialMediaEmbeddable.dto';
import {
  AUTH_PASSWORD_REGEX,
  AUTH_PASSWORD_REGEX_MESSAGE,
} from '@app/authentication/constants/auth.constants';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import {
  EnsureEntityKeys,
  JobPostEntity,
  SearchPreferenceEntity,
  UserEntity,
} from '@app/database';

export class CreateUserDto implements EnsureEntityKeys<UserEntity> {
  /**
   * Email
   */
  @IsEmail()
  @SanitizeEmail()
  email: string;

  /**
   * Password
   */
  @Matches(AUTH_PASSWORD_REGEX, { message: AUTH_PASSWORD_REGEX_MESSAGE })
  password: string;

  /**
   * User first name
   */
  @IsString()
  @Length(2, 50)
  firstName: string;

  /**
   * User last name
   */
  @IsString()
  @Length(2, 50)
  lastName: string;

  /**
   * User country code
   */
  @IsEnum(ISO31661Alpha2)
  countryCode: ISO31661Alpha2;

  /**
   * User social media
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaEmbeddableDto)
  socialMedia: SocialMediaEmbeddableDto;

  /******EXCLUDES******/

  @Exclude()
  backupEmail: string;

  @Exclude()
  searchPreference: SearchPreferenceEntity;

  @Exclude()
  country: ISO31661Alpha2ToCountryName;

  @Exclude()
  refreshToken: string;

  @Exclude()
  TFAEnabled: boolean;

  @Exclude()
  TFASecret: string;

  @Exclude()
  TFARecoveryWords: string;

  @Exclude()
  savedJobs: JobPostEntity[];

  @Exclude()
  appliedJobs: JobPostEntity[];

  @Exclude()
  skippedJobs: JobPostEntity[];
}
