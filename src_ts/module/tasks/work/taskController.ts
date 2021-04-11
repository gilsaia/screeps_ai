import { BaseTaskController } from '../../taskFrame/taskController';

export class WorkTaskController extends BaseTaskController<WorkTaskType, WorkTasks[WorkTaskType]> {
  public constructor(room: Room) {
    super(room, 'WorkTask');
  }
}
