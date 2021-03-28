export class creepTask extends Room {
  /**
   * Add New Creep Task
   * @param role Creep role name
   * @param initial Creep initial
   * @param minLevel
   * @param maxLevel
   */
  public addCreepTask(role: RoleConstant, initial: boolean, minLevel: number, maxLevel: number): ScreepsReturnCode {
    if (!this.memory.creepTaskList) {
      this.memory.creepTaskList = [];
    }
    const task: CreepTask = {
      role,
      minLevel,
      maxLevel,
      initial
    };
    this.memory.creepTaskList.push(task);
    return OK;
  }

  /**
   * Just return top but not delete task
   */
  public topCreepTask(): CreepTask | undefined {
    if (!this.memory.creepTaskList) {
      this.memory.creepTaskList = [];
    }
    return this.memory.creepTaskList[0];
  }

  /**
   * Take Top Creep Task
   */
  public takeCreepTask(): CreepTask | undefined {
    if (!this.memory.creepTaskList) {
      this.memory.creepTaskList = [];
    }
    return this.memory.creepTaskList.shift();
  }

  public creepMinLevel(): number {
    return 0;
  }
  public creepMaxLevel(): number {
    return 8;
  }
}
