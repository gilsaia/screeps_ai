type TaskReturnCode = TASK_COMPLETE | TASK_CONTINUE | TASK_ERR | TASK_SWITCH;
type TASK_COMPLETE = 0;
type TASK_CONTINUE = 1;
type TASK_ERR = 2;
type TASK_SWITCH = 3;

declare const TASK_COMPLETE: TASK_COMPLETE;
declare const TASK_CONTINUE: TASK_CONTINUE;
declare const TASK_ERR: TASK_ERR;
declare const TASK_SWITCH: TASK_SWITCH;

interface RoomTask<T extends string> {
  type: T;
  key?: string;
  priority?: number;
  need: number;
}
interface RoomTaskAction {
  run(): TaskReturnCode;
}
interface RoomTaskBackup {
  [taskName: string]: string;
}
interface RoomMemory {
  taskBackup: RoomTaskBackup;
}
interface TaskController<TaskType extends string, CustomTask extends RoomTask<TaskType>> {
  addTask(task: CustomTask): void;
  updateTask(task: CustomTask): void;
  getTask(): CustomTask | undefined;
  completeTask(task: CustomTask): void;
}
