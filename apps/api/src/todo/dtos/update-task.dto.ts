import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@app/database/entities/todo/task.entity';
import { IsEnum, IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ enum: TaskPriority, required: false })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
