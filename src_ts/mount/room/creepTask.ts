export class creepTask extends Room {
  /**
   * Add New Creep Task
   * @param role Creep role name
   * @param initial Creep initial
   */
  public addCreepTask(role: RoleConstant, initial: boolean): ScreepsReturnCode {
    if (!this.memory.creepTaskList) {
      this.memory.creepTaskList = [];
    }
    const task: CreepTask = {
      role,
      minLevel: creepTask.creepMinLevel(),
      maxLevel: creepTask.creepMaxLevel(),
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
      return undefined;
    }
    return this.memory.creepTaskList[0];
  }

  /**
   * Take Top Creep Task
   */
  public takeCreepTask(): CreepTask | undefined {
    if (!this.memory.creepTaskList) {
      this.memory.creepTaskList = [];
      return undefined;
    }
    return this.memory.creepTaskList.shift();
  }

  private static creepMinLevel(): number {
    return 0;
  }
  private static creepMaxLevel(): number {
    return 1;
  }
}
