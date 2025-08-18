import { CrudRepository } from '@app/database/repositories/abstract/Crud.repository';
import { Task } from '../entities/todo/task.entity';

export class TaskRepository extends CrudRepository<Task> {}
