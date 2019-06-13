import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';

@Injectable()
export class TaskService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  createTasks(title: string, description: string): Task {
    const task: Task  = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid()
    }
    this.tasks.push(task)
    return task
  }

  getTaskById(id: string): Task  {
    const found = this.tasks.find(task => task.id === id)
    if (!found) {
      throw new NotFoundException(`Task not found ${id}`)
    }
    return found
  }

  getTaskFromFiltering(status: string, search: string) {
    let tasks = this.getAllTasks()
    if(status) {
      tasks = tasks.filter(task => task.status === status)
    }
    if(search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    }
    return tasks
  }

  deleteTaskById(id: string): Task[] {
    this.tasks = this.tasks.filter(task => task.id !== id)
    return this.tasks
  }

  updateTask(id: string, body: Body) {
    let result = null;
    for (let task in this.tasks) {
      if(this.tasks[task].id === id) {
        Object.keys(body).forEach(e => {
          this.tasks[task][e] = body[e]
        })
        result = this.tasks[task]
        break
      }
    }
    if(result === null) {
      throw new BadRequestException(`Task ID ${id} not found`)
    }
    return result
  }
 }
