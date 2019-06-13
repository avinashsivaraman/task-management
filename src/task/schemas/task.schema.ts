import * as mongoose from 'mongoose';
import { TaskStatus } from '../task.model';

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    id: String,
    status: TaskStatus
})