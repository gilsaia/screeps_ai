export class buildTask extends Room {
  public addBuildTask(point: Point, worker: number): ScreepsReturnCode {
    if (!this.memory.buildTaskList) {
      this.memory.buildTaskList = [];
    }
    const task: BuildTask = { point, taskType: 'build', worker, check: false };
    this.memory.buildTaskList.push(task);
    return OK;
  }
  public topBuildTask(): BuildTask | undefined {
    if (!this.memory.buildTaskList) {
      this.memory.buildTaskList = [];
    }
    return this.memory.buildTaskList[0];
  }
  public takeBuildTask(): BuildTask | undefined {
    if (!this.memory.buildTaskList) {
      this.memory.buildTaskList = [];
    }
    if (this.memory.buildTaskList[0]) {
      if (this.memory.buildTaskList[0].worker > 1) {
        this.memory.buildTaskList[0].worker--;
        return this.memory.buildTaskList[0];
      } else {
        return this.memory.buildTaskList.shift();
      }
    }
    return undefined;
  }
}
export class customConstructionSite extends RoomPosition {
  public createCustomConstructionSite(type: BuildableStructureConstant): ScreepsReturnCode {
    const point = { x: this.x, y: this.y };
    Game.rooms[this.roomName].addBuildTask(point, 2);
    return this.createConstructionSite(type);
  }
}
