class pQue implements PollingQueue {
  public registerTask(task: pollingTask): void {
    this.taskQueue[task.interval].push(task);
    return;
  }
  public run(): void {
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
  }

  private readonly taskQueue: pollingTask[][] = [];
}

export const pollingQueue = new pQue();
