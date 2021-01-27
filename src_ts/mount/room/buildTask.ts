import { multiTaskTake } from '../../utils';

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
    return multiTaskTake(this.memory.buildTaskList) as BuildTask | undefined;
  }
}
export class customConstructionSite extends RoomPosition {
  public createCustomConstructionSite(type: BuildableStructureConstant): ScreepsReturnCode {
    const point = { x: this.x, y: this.y };
    Game.rooms[this.roomName].addBuildTask(point, 1);
    return this.createConstructionSite(type);
  }
}
