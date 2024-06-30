import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,User])],
  controllers: [TodoController],
  providers: [TodoService, JwtService]
})
export class TodoModule {}
