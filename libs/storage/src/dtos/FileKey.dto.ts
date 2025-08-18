import { Length } from 'class-validator';

export class FileKeyDto {
  @Length(1, 200)
  key: string;
}
