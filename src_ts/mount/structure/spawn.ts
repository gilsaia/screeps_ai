import { creepBody, energyCreepLevel } from '../../config';
import { creepName } from '../../utils';

export class spawnExtend extends StructureSpawn {
  /**
   * Find if there is creep task and spawn it
   */
  public work(): void {
    if (this.spawning) {
      return;
    }
    const task = this.room.topCreepTask();
    if (!task) {
      return;
    }
    const creepLevel = this.findCreepLevel(task.initial);
    if (this.spawnLevelCreep(task.role, creepLevel) === OK) {
      this.room.takeCreepTask();
    }
    return;
  }

  /**
   * Find proper level
   * @param initial
   * @private
   */
  private findCreepLevel(initial: boolean): number {
    if (initial) {
      let level = 0;
      while (this.room.energyAvailable >= energyCreepLevel[level + 1]) {
        ++level;
      }
      return level;
    } else {
      let level = 0;
      while (this.room.energyCapacityAvailable >= energyCreepLevel[level + 1]) {
        ++level;
      }
      return level;
    }
  }
  private spawnLevelCreep(role: RoleConstant, level: number): ScreepsReturnCode {
    return this.spawnCreep(creepBody, creepName(role));
  }
}
