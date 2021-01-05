import { baseCreepNumInit, baseExceptCreepNum } from '../config';
import { roomStage } from './roomStage';

/**
 * API change creep
 */
export const creepApi = {
  /**
   * Add spawn creep task
   * @param role
   * @param num
   * @param room
   * @param initial
   */
  add(role: BaseRoleConstant, num: number, room: string, initial: boolean): ScreepsReturnCode {
    const minLevel = Game.rooms[room].creepMinLevel();
    const maxLevel = Game.rooms[room].creepMaxLevel();
    for (let i = 0; i < num; ++i) {
      Game.rooms[room].addCreepTask(role, initial, minLevel, maxLevel);
    }
    return OK;
  }
};

/**
 * Control creep number in each room
 * @param interval
 */
export function creepControl(interval = 10): void {
  // Wrong time do nothing
  if (Game.time % interval) {
    return;
  }
  for (const room in Game.rooms) {
    // Not control room
    if (Game.rooms[room].energyCapacityAvailable === 0) {
      continue;
    }
    // Last time task hasn't been done
    if (Game.rooms[room].topCreepTask()) {
      continue;
    }
    const checkRoom = Game.rooms[room];
    if (!checkRoom.memory.baseCreepExceptList) {
      checkRoom.memory.baseCreepExceptList = baseExceptCreepNum[roomStage(checkRoom.name)];
    }
    if (!checkRoom.memory.baseCreepList) {
      checkRoom.memory.baseCreepList = baseCreepNumInit;
    }
    for (const role in checkRoom.memory.baseCreepExceptList) {
      const toSpawn =
        checkRoom.memory.baseCreepExceptList[role as BaseRoleConstant] -
        checkRoom.memory.baseCreepList[role as BaseRoleConstant];
      if (toSpawn > 0) {
        creepApi.add(role as BaseRoleConstant, toSpawn, room, false);
      }
      checkRoom.memory.baseCreepList[role as BaseRoleConstant] = 0;
    }
  }
}
