import { Document } from 'mongoose';
import { TaskStatus } from '../task.model';

export interface Task extends Document {
    readonly title: string;
    readonly description: string;
    readonly id: string;
    readonly status: TaskStatus
}