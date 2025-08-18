import { IsUUID } from 'class-validator';

/**
 * Dto used on targeted queries
 */
export class TargetIdDto {
  /**
   * Target ID
   * @example b6a3aa8c-3a3d-4094-9a7b-015b30d9098f
   */
  @IsUUID()
  id: string;
}
