import { characterConfig } from 'config';
import { creepName } from 'utils';

export class SpawnExtend extends StructureSpawn {
  public work(): void {
    const task = this.room.topSpawnTask();
    if (task === undefined || this.spawning) {
      return;
    }
    const res = this.spawningTask(task);
    if (res === OK) {
      this.room.takeSpawnTask();
    } else if (res === ERR_RCL_NOT_ENOUGH) {
      // todo:对于等级不够情况的初始化引导
    }
  }
  public spawningTask(task: string): OK | ERR_NOT_ENOUGH_ENERGY | ERR_RCL_NOT_ENOUGH | ERR_NAME_EXISTS{
    const config = characterConfig.get(task);
    if (!config) {
      console.log('Wrong role name ' + task);
      return OK;
    }
    const res = this.spawnCreep(config.body, creepName(task), {
      memory: { role: task }
    });
    if (res === ERR_NAME_EXISTS) {
      return ERR_NAME_EXISTS;
    } else if (res === ERR_NOT_ENOUGH_ENERGY) {
      return ERR_NOT_ENOUGH_ENERGY;
    } else if (res === ERR_RCL_NOT_ENOUGH) {
      return ERR_RCL_NOT_ENOUGH;
    }
    return OK;
  }
}
