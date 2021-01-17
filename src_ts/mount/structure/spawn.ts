import { creepBody, energyCreepLevel } from '../../config';
import { creepApi } from '../../module/creepControl';
import { creepName } from '../../utils';

export class spawnExtend extends StructureSpawn {
  /**
   * Find if there is creep task and spawn it
   */
  public work(): void {
    console.log('123');
    if (this.spawning) {
      return;
    }
    console.log('?????');
    const res = this.store.getFreeCapacity(RESOURCE_ENERGY);
    console.log('Energy', res);
    if (this.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      console.log('???');
      this.room.addTransportTask(RESOURCE_ENERGY, this.id);
    }
    const task = this.room.topCreepTask();
    if (!task) {
      return;
    }
    const creepLevel = this.findCreepLevel(task.initial);
    if (this.spawnLevelCreep(task.role, creepLevel) === OK) {
      creepApi.count(this.room, task.role);
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
  private spawnLevelCreep(roleName: RoleConstant, level: number): ScreepsReturnCode {
    return this.spawnCreep(creepBody[roleName][level], creepName(roleName, this.room.name), {
      memory: { role: roleName, working: false, room: this.room.name }
    });
  }
}
