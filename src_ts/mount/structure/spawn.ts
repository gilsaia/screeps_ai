import { creepName } from 'utils';
import { roleConfig } from 'config';

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
  public spawningTask(task: RoleConstant): OK | ERR_NOT_ENOUGH_ENERGY | ERR_RCL_NOT_ENOUGH | ERR_NAME_EXISTS | ERR_INVALID_TARGET{
    // const config = roleConfig.get(task);
    const config = roleConfig[task];
    if (!config) {
      console.log('Wrong role name ' + task);
      return OK;
    }
    // 获取资源初始化信息
    const sourceId: Id<any> | undefined = this.room.findSource(task);

    const res = this.spawnCreep(config.body, creepName(task), {
      memory: { role: task, source: sourceId, working: false }
    });
    if (res === ERR_NAME_EXISTS) {
      return ERR_NAME_EXISTS;
    } else if (res === ERR_NOT_ENOUGH_ENERGY) {
      return ERR_NOT_ENOUGH_ENERGY;
    } else if (res === ERR_RCL_NOT_ENOUGH) {
      return ERR_RCL_NOT_ENOUGH;
    } else if (res === OK) {
      this.room.addWorker(sourceId);
    }
    return OK;
  }
}
