import { FindOptions } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export class FindPaginateResponseMeta {
  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

export class FindPaginateResponse<Entity> {
  @ApiProperty()
  meta: FindPaginateResponseMeta;

  @ApiProperty()
  items: Array<Entity>;
}

export interface FindPaginatedOptions<T, P extends string = never>
  extends FindOptions<T, P> {
  page?: number;
}
