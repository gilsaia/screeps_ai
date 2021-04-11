export const pollingQueue: PollingQueue = {
  // 注册全局任务
  registerTask(task: PollingTask) {
    // 需要立即执行的话
    if (task.immediate) {
      task.check(task.data);
    }
    // 如果该时间片不存在列表
    if (!this.taskQueue[task.interval]) {
      this.taskQueue[task.interval] = [];
    }
    this.taskQueue[task.interval].push(task);
    return;
  },
  // 注册逐房间检查任务
  registerRoomTask(task: PollingRoomTask) {
    // 首先立即执行一遍任务
    for (const roomName in Game.rooms) {
      // 非控制房间跳过
      const room = Game.rooms[roomName];
      if (!(room.controller && room.controller.my)) {
        continue;
      }
      task.check(task.data, room);
    }
    // 如果该时间片不存在列表
    if (!this.roomTaskQueue[task.interval]) {
      this.roomTaskQueue[task.interval] = [];
    }
    this.roomTaskQueue[task.interval].push(task);
    return;
  },
  run() {
    // 取出当前时间片任务
    const taskList = this.taskQueue.shift();
    const roomTaskList = this.roomTaskQueue.shift();
    // 若存在全局任务
    if (taskList) {
      for (const task of taskList) {
        // 对每个任务分别执行
        task.check(task.data);
        // 该任务需要重复执行
        if (task.repeat) {
          // 若该时间片不存在列表
          if (!this.taskQueue[task.interval]) {
            this.taskQueue[task.interval] = [];
          }
          this.taskQueue[task.interval].push(task);
        }
      }
    }
    // 若存在逐房间执行任务
    if (roomTaskList && roomTaskList.length) {
      // 对每个房间分别执行
      for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        // 非控制房间跳过
        if (!(room.controller && room.controller.my)) {
          continue;
        }
        for (const task of roomTaskList) {
          task.check(task.data, room);
          // 若任务需要重复执行
          if (task.repeat) {
            // 若该时间片不存在列表
            if (!this.roomTaskQueue[task.interval]) {
              this.roomTaskQueue[task.interval] = [];
            }
            this.roomTaskQueue[task.interval].push(task);
          }
        }
      }
    }
    return;
  },
  taskQueue: [],
  roomTaskQueue: []
};
