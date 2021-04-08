export const pollingQueue: PollingQueue = {
  registerTask(task: PollingTask) {
    task.check(task.data);
    this.taskQueue[task.interval].push(task);
    return;
  },
  registerRoomTask(task: PollingRoomTask) {
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (!(room.controller && room.controller.my)) {
        continue;
      }
      task.check(task.data, room);
    }
    this.roomTaskQueue[task.interval].push(task);
    return;
  },
  run() {
    const taskList = this.taskQueue.shift();
    const roomTaskList = this.roomTaskQueue.shift();
    this.taskQueue.push([]);
    this.roomTaskQueue.push([]);
    if (taskList) {
      for (const task of taskList) {
        task.check(task.data);
        if (task.repeat) {
          this.taskQueue[task.interval].push(task);
        }
      }
    }
    if (roomTaskList && roomTaskList.length) {
      for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        if (!(room.controller && room.controller.my)) {
          continue;
        }
        for (const task of roomTaskList) {
          task.check(task.data, room);
          if (task.repeat) {
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
