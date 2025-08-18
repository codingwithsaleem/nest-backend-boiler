import {
  EnsureEntityKeys,
  JobPostEntity,
  SearchPreferenceEntity,
  UserEntity,
} from '@app/database';
import { SocialMediaEmbeddableDto } from '@app/database/dtos/SocialMediaEmbeddable.dto';
import { ISO31661Alpha2, ISO31661Alpha2ToCountryName } from '@app/shared';
import { Exclude, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateUserDto implements EnsureEntityKeys<UserEntity> {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEnum(ISO31661Alpha2)
  countryCode: ISO31661Alpha2;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialMediaEmbeddableDto)
  socialMedia: SocialMediaEmbeddableDto;

  /*********** Excludes ***********/

  @Exclude()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  country: ISO31661Alpha2ToCountryName;

  @Exclude()
  searchPreference: SearchPreferenceEntity;

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

  @Exclude()
  backupEmail: string;
}
