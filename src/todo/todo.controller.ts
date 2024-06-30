import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entity/todo.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService){}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request) : Promise<Todo[]>{
    
    const userId = request.user.sub;
    return this.todoService.findAllByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async addTask(@Req() request, @Body() CreateTodoDto: CreateTodoDto) : Promise<Todo>{
    const userId = request.user.sub;
    return this.todoService.addTask(userId, CreateTodoDto);
  }

  @UseGuards(AuthGuard)
  @Post(':id/toggle')
  async toggleTask(@Req() request, @Param('id', ParseIntPipe)id : number ): Promise<Todo>{
    const userId = request.user.sub;
    return this.todoService.toggleTask(id, userId);
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  async delteTask(@Req() request, @Param('id', ParseIntPipe)id : number ): Promise<void>{
    const userId = request.user.sub;
    return this.todoService.deleteTask(id, userId);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTask(@Req() request, @Param('id', ParseIntPipe)id : number,@Body() updateTodoDto: UpdateTodoDto ): Promise<Todo>{
    const userId = request.user.sub;
    return this.todoService.updateTask(id, userId, updateTodoDto);
  }

}
