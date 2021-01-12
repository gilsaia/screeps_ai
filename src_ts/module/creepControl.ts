import { baseCreepNumInit, baseExceptCreepNum } from '../config';
import { roomStage, sourceApi } from './roomStage';

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
   * Init memory for the creep
   * @param creep
   */
  init(creep: Creep): void {
    let sourceCondition;
    let source;
    switch (creep.memory.role) {
      case 'harvester':
        sourceCondition = sourceApi.allocSource(creep.room);
        source = Game.getObjectById(sourceCondition.sourceId);
        if (!source) {
          console.log('err sourceId check now!');
          break;
        }
        creep.memory.data = {
          sourceId: sourceCondition.sourceId,
          containerId: sourceCondition.containerId,
          room: creep.room.name,
          sourcePosX: source.pos.x,
          sourcePosY: source.pos.y,
          containerPosX: sourceCondition.containerPosX,
          containerPosY: sourceCondition.containerPosY,
          complete: sourceCondition.complete
        };
        break;
    }
    return;
  },
  /**
   * Delete creep need to do thing
   * @param creep
   */
  finish(creep: CreepMemory): void {
    let data = null;
    switch (creep.role) {
      case 'harvester':
        if (!creep.data) {
          return;
        }
        data = creep.data as harvesterData;
        for (const source of Game.rooms[data.room].memory.sourceList) {
          if (source.sourceId === data.sourceId) {
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
