import { Injectable } from '@nestjs/common';
import { Task } from '@app/database/entities/todo/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskResponseDto } from './dtos/task-response.dto';
import { PaginatedTaskResponseDto } from './dtos/paginated-task-response.dto';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TaskRepository } from '@app/database/repositories/Task.repository';

@Injectable()
export class TodoService {
  /**
   * Service for Todo CRUD operations.
   * @param taskRepository The repository for Task entity.
   */
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  /**
   * Create a new task.
   * @param dto The data for the new task.
   * @returns The created task.
   */
  async create(dto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = this.taskRepository.create(dto);
    await this.taskRepository.persistAndFlush(task);
    const obj = wrap(task).toObject();
    return {
      ...obj,
      dateOfCreation: task.createdAt,
    } as TaskResponseDto;
  }

  /**
   * Update an existing task.
   * @param id The ID of the task to update.
   * @param dto The updated task data.
   * @returns The updated task.
   */
  async update(id: string, dto: UpdateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOneOrFail(id);
    wrap(task).assign(dto);
    await this.taskRepository.flush();
    const obj = wrap(task).toObject();
    return {
      ...obj,
      dateOfCreation: task.createdAt,
    } as TaskResponseDto;
  }

  /**
   * Delete a task by ID.
   * @param id The ID of the task to delete.
   * @returns Success status.
   */
  async delete(id: string): Promise<{ success: boolean }> {
    const task = await this.taskRepository.findOneOrFail(id);
    await this.taskRepository.removeAndFlush(task);
    return { success: true };
  }

  /**
   * List tasks with pagination and filter.
   * @param page The page number.
   * @param pageSize The number of items per page.
   * @param status Filter by status.
   * @param priority Filter by priority.
   * @returns Paginated list of tasks.
   */
  async list(
    page = 1,
    pageSize = 10,
    status?: string,
    priority?: string,
  ): Promise<PaginatedTaskResponseDto> {
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    const [items, total] = await this.taskRepository.findAndCount(where, {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: { createdAt: 'DESC' },
    });
    return {
      items: items.map(i => {
        const obj = wrap(i).toObject();
        return {
          ...obj,
          dateOfCreation: i.createdAt,
        } as TaskResponseDto;
      }),
      total,
      page,
      pageSize,
    };
  }

  /**
   * Fetch a single task by ID.
   * @param id The ID of the task to fetch.
   * @returns The task.
   */
  async fetchOne(id: string): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOneOrFail(id);
    const obj = wrap(task).toObject();
    return {
      ...obj,
      dateOfCreation: task.createdAt,
    } as TaskResponseDto;
  }
}
