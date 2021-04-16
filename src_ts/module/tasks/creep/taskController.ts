import { BaseTaskController } from '../../taskFrame/taskController';

export class CreepTaskController extends BaseTaskController<CreepTaskType, CreepTasks[CreepTaskType]> {
  public constructor(room: Room) {
    super(room, 'CreepTask');
  }
}
