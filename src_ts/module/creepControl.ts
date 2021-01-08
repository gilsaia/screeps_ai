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
   * @param minLevel
   * @param maxLevel
   */
  add(
    role: BaseRoleConstant,
    num: number,
    room: string,
    initial: boolean,
    minLevel: number,
    maxLevel: number
  ): ScreepsReturnCode {
    for (let i = 0; i < num; ++i) {
      Game.rooms[room].addCreepTask(role, initial, minLevel, maxLevel);
    }
    return OK;
  },
  /**
   * Delete creep need to do thing
   * @param creep
   */
  finish(creep: CreepMemory): void {
    switch (creep.role) {
      case 'harvester':
        if (!creep.sourceId) {
          return;
        }
        for (const source of Game.rooms[creep.room].memory.sourceList) {
          if (source.id === creep.sourceId) {
            source.harvester--;
            return;
          }
        }
    }
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
    const minLevel = Game.rooms[room].creepMinLevel();
    const maxLevel = Game.rooms[room].creepMaxLevel();
    if (!checkRoom.memory.baseCreepExceptList) {
      checkRoom.memory.baseCreepExceptList = baseExceptCreepNum[roomStage(checkRoom)];
    }
    if (!checkRoom.memory.baseCreepList) {
      checkRoom.memory.baseCreepList = baseCreepNumInit;
    }
    for (const role in checkRoom.memory.baseCreepExceptList) {
      const toSpawn =
        checkRoom.memory.baseCreepExceptList[role as BaseRoleConstant] -
        checkRoom.memory.baseCreepList[role as BaseRoleConstant];
      if (toSpawn > 0) {
        creepApi.add(role as BaseRoleConstant, toSpawn, room, false, minLevel, maxLevel);
      }
      checkRoom.memory.baseCreepList[role as BaseRoleConstant] = 0;
    }
  }
}
