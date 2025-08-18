import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskResponseDto } from './dtos/task-response.dto';
import { PaginatedTaskResponseDto } from './dtos/paginated-task-response.dto';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('public/todo')
export class TodoController {
  /**
   * Controller for Todo CRUD operations.
   * @param todoService The service handling todo business logic.
   */
  constructor(private readonly todoService: TodoService) {}

  /**
   * Create a new task.
   * @param dto The data for the new task.
   * @returns The created task.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.todoService.create(dto);
  }

  /**
   * Update an existing task.
   * @param id The ID of the task to update.
   * @param dto The updated task data.
   * @returns The updated task.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<TaskResponseDto> {
    return this.todoService.update(id, dto);
  }

  /**
   * Delete a task by ID.
   * @param id The ID of the task to delete.
   * @returns Success status.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.todoService.delete(id);
  }

  /**
   * List tasks with pagination and filter.
   * @param page The page number.
   * @param pageSize The number of items per page.
   * @param status Filter by status.
   * @param priority Filter by priority.
   * @returns Paginated list of tasks.
   */
  @Get()
  @ApiOperation({ summary: 'List tasks with pagination and filter' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'priority', required: false })
  list(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ): Promise<PaginatedTaskResponseDto> {
    return this.todoService.list(page, pageSize, status, priority);
  }

  /**
   * Fetch a single task by ID.
   * @param id The ID of the task to fetch.
   * @returns The task.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Fetch one task' })
  fetchOne(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.todoService.fetchOne(id);
  }
}
