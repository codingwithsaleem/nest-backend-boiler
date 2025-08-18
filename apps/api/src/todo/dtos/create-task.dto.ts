import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@app/database/entities/todo/task.entity';
import { IsEnum, IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.Pending })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ enum: TaskPriority, default: TaskPriority.Blue })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
