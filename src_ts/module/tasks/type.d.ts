interface BasicTaskApi {
  addCreepTask(room: Room, task: CreepTasks[CreepTaskType]): void;
  addTransferTask(room: Room, task: TransferTasks[TransferTaskType]): void;
  addWorkTask(room: Room, task: WorkTasks[WorkTaskType]): void;
  getCreepTask(room: Room): CreepTasks[CreepTaskType] | undefined;
  getCarryTask(room: Room): TransferTasks[TransferTaskType] | undefined;
  getWorkTask(room: Room): WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType] | undefined;
  updateTask(room: Room, task: WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType]): void;
  completeCreepTask(room: Room, task: CreepTasks[CreepTaskType]): void;
  completeTask(room: Room, task: WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType]): void;
}
