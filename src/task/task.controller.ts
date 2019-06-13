import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task-dto';
import { TaskStatusValidatePipe } from './pipes/update-task.pipes';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() filterTaskDTO: FilterTaskDTO) {
    if (Object.keys(filterTaskDTO).length) {
      const { search, status } = filterTaskDTO
      return this.taskService.getTaskFromFiltering(status, search)
    } else {
      return this.taskService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() {title, description} : CreateTaskDTO ) {
    return this.taskService.createTasks(title, description)
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
