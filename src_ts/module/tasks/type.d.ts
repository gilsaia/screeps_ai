interface BasicTaskApi {
  addTransferTask(room: Room, task: TransferTasks[TransferTaskType]): void;
  addWorkTask(room: Room, task: WorkTasks[WorkTaskType]): void;
  getCarryTask(room: Room): TransferTasks[TransferTaskType] | undefined;
  getWorkTask(room: Room): WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType] | undefined;
  updateTask(room: Room, task: WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType]): void;
  completeTask(room: Room, task: WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType]): void;
}
