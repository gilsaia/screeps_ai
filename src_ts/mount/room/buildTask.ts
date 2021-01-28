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
    return this.memory.buildTaskList[this.memory.buildTaskList.length - 1];
  }
  public takeBuildTask(): BuildTask | undefined {
    if (!this.memory.buildTaskList) {
      this.memory.buildTaskList = [];
    }
    return multiTaskTake(this.memory.buildTaskList) as BuildTask | undefined;
  }
  public addRepairTask(id: Id<Structure<StructureConstant>>, worker: number): ScreepsReturnCode {
    if (!this.memory.repairTaskList) {
      this.memory.repairTaskList = [];
    }
    const task: RepairTask = { id, taskType: 'repair', worker };
    this.memory.repairTaskList.push(task);
    return OK;
  }
  public topRepairTask(): RepairTask | undefined {
    if (!this.memory.repairTaskList) {
      this.memory.repairTaskList = [];
    }
    return this.memory.repairTaskList[this.memory.repairTaskList.length - 1];
  }
  public takeRepairTask(): RepairTask | undefined {
    if (!this.memory.repairTaskList) {
      this.memory.repairTaskList = [];
    }
    return multiTaskTake(this.memory.repairTaskList) as RepairTask | undefined;
  }
}
export class customConstructionSite extends RoomPosition {
  public createCustomConstructionSite(type: BuildableStructureConstant): ScreepsReturnCode {
    const point = { x: this.x, y: this.y };
    Game.rooms[this.roomName].addBuildTask(point, 1);
    return this.createConstructionSite(type);
  }
}
