import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidatePipe implements PipeTransform {
  private validStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ]
  transform(value: any, metaData: ArgumentMetadata) {
    // console.log(value, metaData)
    const keys = Object.keys(value)
    if(keys.length) {
      keys.forEach(key => {
        if(key === 'status' && !this.isValidState(value[key])) {
          throw new BadRequestException(`Not a valid status`)
        }
      })
    } else {
      throw new BadRequestException(`Update parameter not found`)
    }
    return value
  }

  private isValidState(status: TaskStatus): boolean {
    return this.validStatus.includes(status)
  }
}