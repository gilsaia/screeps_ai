import { TransferTaskController } from './transfer/taskController';
import { WorkTaskController } from './work/taskController';

export const TaskApi: BasicTaskApi = {
  addTransferTask(room: Room, task: TransferTasks[TransferTaskType]): void {
    if (!room._transferTaskController) {
      room._transferTaskController = new TransferTaskController(room);
    }
    room._transferTaskController.addTask(task);
    return;
  },
  addWorkTask(room: Room, task: WorkTasks[WorkTaskType]): void {
    if (!room._workTaskController) {
      room._workTaskController = new WorkTaskController(room);
    }
    room._workTaskController.addTask(task);
    return;
  },
  getCarryTask(room: Room): TransferTasks[TransferTaskType] | undefined {
    if (!room._transferTaskController) {
      room._transferTaskController = new TransferTaskController(room);
    }
    return room._transferTaskController.getTask();
  },
  getWorkTask(room: Room): WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType] | undefined {
    if (!room._workTaskController) {
      room._workTaskController = new WorkTaskController(room);
    }
    const task = room._workTaskController.getTask();
    if (task) {
      return task;
    }
    return this.getCarryTask(room);
  },
  updateTask(room: Room, task: WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType]): void {
    switch (task.type) {
      case 'build':
      case 'repair':
        if (!room._workTaskController) {
          room._workTaskController = new WorkTaskController(room);
        }
        room._workTaskController.updateTask(task);
        break;
      case 'fillExtension':
      case 'fillTower':
        if (!room._transferTaskController) {
          room._transferTaskController = new TransferTaskController(room);
        }
        room._transferTaskController.updateTask(task);
        break;
    }
    return;
  },
  completeTask(room: Room, task: WorkTasks[WorkTaskType] | TransferTasks[TransferTaskType]): void {
    switch (task.type) {
      case 'repair':
      case 'build':
        if (!room._workTaskController) {
          room._workTaskController = new WorkTaskController(room);
        }
        room._workTaskController.completeTask(task);
        break;
      case 'fillTower':
      case 'fillExtension':
        if (!room._transferTaskController) {
          room._transferTaskController = new TransferTaskController(room);
        }
        room._transferTaskController.completeTask(task);
        break;
    }
    return;
  }
};
