import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class SiftNumberQueryDto {
  @IsOptional()
  @IsNumber()
  $eq?: number;

  @IsOptional()
  @IsNumber()
  $ne?: number;

  @IsOptional()
  @IsNumber()
  $lt?: number;

  @IsOptional()
  @IsNumber()
  $gt?: number;

  @IsOptional()
  @IsNumber()
  $lte?: number;

  @IsOptional()
  @IsNumber()
  $gte?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  $in?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  $nin?: number[];

  @IsOptional()
  @IsBoolean()
  $exists?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftNumberQueryDto)
  $or?: SiftNumberQueryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftNumberQueryDto)
  $and?: SiftNumberQueryDto[];
}

export class SiftStringQueryDto {
  @IsOptional()
  @IsString()
  $eq?: string;

  @IsOptional()
  @IsString()
  $ne?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  $in?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  $nin?: string[];

  @IsOptional()
  @IsBoolean()
  $exists?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftStringQueryDto)
  $or?: SiftStringQueryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftStringQueryDto)
  $and?: SiftStringQueryDto[];
}

export class SiftUUIDQueryDto {
  @IsOptional()
  @IsUUID()
  $eq?: string;

  @IsOptional()
  @IsUUID()
  $ne?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  $in?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  $nin?: string[];

  @IsOptional()
  @IsBoolean()
  $exists?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftUUIDQueryDto)
  $or?: SiftUUIDQueryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftUUIDQueryDto)
  $and?: SiftUUIDQueryDto[];
}

export class SiftStringArrayQueryDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  $all?: string[];

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SiftStringQueryDto)
  $elemMatch?: SiftStringQueryDto;

  @IsOptional()
  @IsBoolean()
  $exists?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftStringArrayQueryDto)
  $or?: SiftStringArrayQueryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiftStringArrayQueryDto)
  $and?: SiftStringArrayQueryDto[];
}
