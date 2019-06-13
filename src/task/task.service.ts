import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interfaces';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') readonly taskModel: Model<Task>){}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec()
  }

  async createTasks(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const addedTask = await this.taskModel(createTaskDTO)
    return addedTask.save()
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.find({id: id}).exec()
    if (!task.length) {
      throw new NotFoundException(`No task found`)
    }
    return task
  }

  async getTaskFromFiltering(status: string, search: string) {
    let searchTerm = {}
    if(status){
      searchTerm['status'] = status
    }
    if(search) {
      const title = {title: {$regex: `.*${search}.*`}};
      const description = {description: {$regex: `.*${search}.*`}}
      searchTerm = { $or: [ title, description ], ...searchTerm
    }
    }
    const tasks = await this.taskModel.find(searchTerm)
    if(!tasks.length) {
      throw new BadRequestException(`No Task found`)
    }
    return tasks
  }

  async deleteTaskById(id: string): Promise<Task[]> {
    this.taskModel.remove({id: id}).exec()
    return this.getAllTasks()
  }

  async updateTask(id: string, body: Body) {
    console.log(body)
    this.taskModel.updateMany({id: id}, { $set: body }).exec()
    return this.getTaskById(id)
  }
 }
