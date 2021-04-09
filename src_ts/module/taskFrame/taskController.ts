class BaseTaskController<TaskType extends string, CustomTask extends RoomTask<TaskType>> {
  public addTask(task: CustomTask): void {
    const taskKey = getTaskKey(task);
    if (this.taskDict.has(taskKey)) {
      return;
    }
    let insertIndex = this.tasks.length;
    this.tasks.find((cmpTask, taskIndex) => {
      if (!cmpTask.priority || !task.priority || cmpTask.priority >= task.priority) {
        return false;
      }
      insertIndex = taskIndex;
      return true;
    });
    this.tasks.splice(insertIndex, 0, task);
    this.taskDict.add(taskKey);
    this.save();
    return;
  }
  public updateTask(task: CustomTask): void {
    const taskKey = getTaskKey(task);
    let index = this.tasks.length;
    this.tasks.find((cmpTask, taskIndex) => {
      if (taskKey === getTaskKey(cmpTask)) {
        index = taskIndex;
        return true;
      }
      return false;
    });
    this.tasks[index] = task;
    return;
  }
  public getTask(): CustomTask | undefined {
    const task = this.tasks.shift();
    if (!task) {
      return task;
    }
    if (task.need > 1) {
      task.need--;
      this.tasks.unshift(task);
    }
    return task;
  }
  public completeTask(task: CustomTask): void {
    const taskKey = getTaskKey(task);
    let index = this.tasks.length;
    this.tasks.find((cmpTask, taskIndex) => {
      if (taskKey === getTaskKey(cmpTask)) {
        index = taskIndex;
        return true;
      }
      return false;
    });
    if (index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
    this.taskDict.delete(taskKey);
    return;
  }
  protected roomName: string;
  protected TASK_ROOM_KEY = '';
  public tasks: CustomTask[] = [];
  private taskDict: Set<string>;
  public constructor(room: Room, memoryKey: string) {
    this.roomName = room.name;
    this.TASK_ROOM_KEY = memoryKey;
    this.taskDict = new Set<string>();
    this.init();
  }
  protected init(): void {
    const roomMemory = Game.rooms[this.roomName].memory;
    if (!roomMemory) return;
    // 从内存中解析数据
    this.tasks = JSON.parse(roomMemory[this.TASK_ROOM_KEY] || '[]') as CustomTask[];
    for (const task of this.tasks) {
      this.taskDict.add(getTaskKey(task));
    }
    return;
  }
  protected save(): void {
    const roomMemory = Game.rooms[this.roomName].memory;

    if (this.tasks.length <= 0) delete roomMemory[this.TASK_ROOM_KEY];
    else roomMemory[this.TASK_ROOM_KEY] = JSON.stringify(this.tasks);
    return;
  }
}
function getTaskKey<TaskType extends string, CustomTask extends RoomTask<TaskType>>(task: CustomTask): string {
  let taskKey: string = task.type;
  if (task.key) {
    taskKey = task.key;
  }
  return taskKey;
}
