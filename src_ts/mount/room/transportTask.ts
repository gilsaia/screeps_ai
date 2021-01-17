import { transportTaskTypeMap } from '../../config';

export class transportTask extends Room {
  public addTransportTask(resourceType: ResourceConstant, transportType: TransportTaskType): ScreepsReturnCode {
    if (!this.memory.transportTaskList) {
      this.memory.transportTaskList = [];
      this.memory.transportTaskSet = [];
    }
    if (this.memory.transportTaskSet[transportTaskTypeMap[transportType]] !== 1) {
      const taskType: TaskType = 'transport';
      const task: TransportTask = { resourceType, taskType, transportType };
      this.memory.transportTaskList.push(task);
      this.memory.transportTaskSet[transportTaskTypeMap[transportType]] = 1;
    }
    return OK;
  }
  public takeTransportTask(): TransportTask | undefined {
    if (!this.memory.transportTaskList) {
      this.memory.transportTaskList = [];
      this.memory.transportTaskSet = [];
    }
    return this.memory.transportTaskList.shift();
  }
  public finishTransportTask(task: TransportTask): ScreepsReturnCode {
    if (!this.memory.transportTaskList) {
      this.memory.transportTaskList = [];
      this.memory.transportTaskSet = [];
    }
    this.memory.transportTaskSet[transportTaskTypeMap[task.transportType]] = 0;
    return OK;
  }
}
