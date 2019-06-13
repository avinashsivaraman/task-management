import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task-dto';
import { TaskStatusValidatePipe } from './pipes/update-task.pipes';
import { TaskStatus } from './task.model'
import * as uuid from 'uuid/v1';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getTasks(@Query() filterTaskDTO: FilterTaskDTO) {
    if (Object.keys(filterTaskDTO).length) {
      const { search, status } = filterTaskDTO
      return this.taskService.getTaskFromFiltering(status, search)
    } else {
      return await this.taskService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Res() res, @Body('title') title: string,  @Body('description') description: string ) {
    const createTaskDTO: CreateTaskDTO = {
      title,
      description,
      id: uuid(),
      status: TaskStatus.OPEN
    }
    const addTask = await this.taskService.createTasks(createTaskDTO)
    return res.status(HttpStatus.OK).json({
      message: 'Task has been added',
      task: addTask
    })
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id)
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body(TaskStatusValidatePipe) body) {
    return this.taskService.updateTask(id, body)
  }
}
