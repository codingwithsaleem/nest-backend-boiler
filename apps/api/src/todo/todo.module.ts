import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from '@app/database';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from '@app/database/entities/todo/task.entity';

@Module({
  imports: [DatabaseModule, MikroOrmModule.forFeature([Task])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
