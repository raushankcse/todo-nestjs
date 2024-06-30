import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from 'src/user/entity/user.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ){}

  async findAllByUserId(userId: number): Promise<Todo[] | null>{
    return this.todosRepository.find({where: {userId}});
  }


  async addTask(userId: number, createTodoDto: CreateTodoDto): Promise<Todo>{
    const newTask = this.todosRepository.create({
      ...createTodoDto,
      userId,
    });
    return this.todosRepository.save(newTask);
  }

  async toggleTask(id: number, userId: number): Promise<Todo> {
    const task = await this.todosRepository.findOne({where: {id, userId}});
    if(!task){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.completed = !task.completed;
    return this.todosRepository.save(task);
  }

  async deleteTask(id: number, userId: number): Promise<void>{
    const task = await this.todosRepository.findOne({where: {id, userId}});

    if(!task){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.todosRepository.remove(task);
  }

  async updateTask(id : number, userId: number, updateTodoDto: UpdateTodoDto): Promise<Todo>{
    const task = await this.todosRepository.findOne({where: {id, userId}});
    if(!task){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if(updateTodoDto.title !== undefined){
      task.title = updateTodoDto.title;
    }
    return this.todosRepository.save(task);
  }

}
