export const pollingQueue: PollingQueue = {
  registerTask(task: PollingTask) {
    this.taskQueue[task.interval].push(task);
    return;
  },
  run() {
    const taskList = this.taskQueue.shift();
    this.taskQueue.push([]);
    if (!taskList) {
      return;
    }
    for (const task of taskList) {
      task.check(task.data);
      if (task.repeat) {
        this.taskQueue[task.interval].push(task);
      }
    }
    return;
  },
  taskQueue: []
};
