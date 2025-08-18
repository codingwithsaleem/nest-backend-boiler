import { Entity, Property, Enum } from '@mikro-orm/core';
import { BaseEntity } from '@app/database/entities/abstract/Base.entity';

export enum TaskStatus {
  Pending = 'Pending',
  Done = 'Done',
  InProgress = 'In Progress',
  Paused = 'Paused',
}

export enum TaskPriority {
  Red = 'Red', // High
  Yellow = 'Yellow', // Medium
  Blue = 'Blue', // Normal
}

@Entity({ tableName: 'tasks' })
export class Task extends BaseEntity {
  @Property({ length: 255 })
  name!: string;

  @Property({ nullable: true, type: 'date' })
  dueDate?: Date;

  @Enum(() => TaskStatus)
  status: TaskStatus = TaskStatus.Pending;

  @Enum(() => TaskPriority)
  priority: TaskPriority = TaskPriority.Blue;

  @Property({ default: true })
  isActive: boolean = true;
}
