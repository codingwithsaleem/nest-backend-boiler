import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '../../entities/todo/task.entity';

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  dueDate?: Date;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ enum: TaskPriority })
  priority: TaskPriority;

  @ApiProperty()
  dateOfCreation: Date;

  @ApiProperty()
  isActive: boolean;
}
