export class transportTask extends Room {
  public addTransportTask(type: ResourceConstant, id: Id<Structure<StructureConstant>>): ScreepsReturnCode {
    if (!this.memory.transportTaskList || !this.memory.transportTaskSet) {
      console.log('create new');
      this.memory.transportTaskList = [];
      this.memory.transportTaskSet = new Set<Id<Structure<StructureConstant>>>();
    }
    const taskType = TaskType.transport;
    if (!this.memory.transportTaskSet.has(id)) {
      const task = { resourceType: type, taskType, id };
      this.memory.transportTaskList.push(task);
    }
    return OK;
  }
  public takeTransportTask(): TransportTask | undefined {
    if (!this.memory.transportTaskList || !this.memory.transportTaskSet) {
      this.memory.transportTaskList = [];
      this.memory.transportTaskSet = new Set<Id<Structure<StructureConstant>>>();
    }
    return this.memory.transportTaskList.shift();
  }
  public finishTransportTask(task: TransportTask): ScreepsReturnCode {
    this.memory.transportTaskSet.delete(task.id);
    return OK;
  }
}
