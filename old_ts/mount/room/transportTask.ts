import { multiTaskTake } from '../../utils';

export class transportTask extends Room {
  public addTransportTask(
    resourceType: ResourceConstant,
    transportType: TransportTaskType,
    worker: number
  ): ScreepsReturnCode {
    if (!this.memory.transportTaskList) {
      this.memory.transportTaskList = [];
    }
    const taskType: TaskType = 'transport';
    const task: TransportTask = { resourceType, taskType, transportType, worker };
    this.memory.transportTaskList.push(task);
    return OK;
  }
  public takeTransportTask(): TransportTask | undefined {
    if (!this.memory.transportTaskList) {
      this.memory.transportTaskList = [];
    }
    return multiTaskTake(this.memory.transportTaskList) as TransportTask | undefined;
  }
}
