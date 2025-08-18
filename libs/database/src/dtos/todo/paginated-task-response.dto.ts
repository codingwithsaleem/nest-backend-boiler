import { ApiProperty } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response.dto';

export class PaginatedTaskResponseDto {
  @ApiProperty({ type: [TaskResponseDto] })
  items: TaskResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;
}
