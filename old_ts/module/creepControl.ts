import { baseCreepNumInit, baseExceptCreepNum } from '../config';
import { roomStage, sourceApi } from './roomStage';
import { taskApi } from './taskHandle';

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
    role: RoleConstant,
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
          sourcePosX: source.pos.x,
          sourcePosY: source.pos.y,
          containerPosX: sourceCondition.containerPosX,
          containerPosY: sourceCondition.containerPosY,
          complete: sourceCondition.complete
        };
        break;
      case 'upgrader':
      case 'worker':
      case 'filler':
        source = sourceApi.getSource(creep.room);
        creep.memory.data = {
          sourceId: source
        };
        break;
    }
    return;
  },
  /**
   * Count creep
   * @param room
   * @param role
   */
  count(room: Room, role: RoleConstant): void {
    switch (role) {
      case 'harvester':
      case 'upgrader':
      case 'worker':
      case 'filler':
        room.memory.baseCreepList[role]++;
        break;
    }
    return;
  },
  /**
   * Decrease creep
   */
  decrease(room: Room, role: RoleConstant): void {
    switch (role) {
      case 'harvester':
      case 'upgrader':
      case 'worker':
      case 'filler':
        room.memory.baseCreepList[role]--;
        break;
    }
    return;
  },
  /**
   * Delete creep need to do thing
   * @param creep
   */
  finish(creep: CreepMemory): void {
    const minLevel = Game.rooms[creep.room].creepMinLevel();
    const maxLevel = Game.rooms[creep.room].creepMaxLevel();
    let data;
    creepApi.add(creep.role, 1, creep.room, false, minLevel, maxLevel);
    creepApi.decrease(Game.rooms[creep.room], creep.role);
    switch (creep.role) {
      case 'harvester':
      case 'upgrader':
        break;
      case 'filler':
      case 'worker':
        data = creep.data as fillerData;
        if (data.task) {
          taskApi.finish(Game.rooms[creep.room], data.task, true);
        }
        break;
    }
  }
};

/**
 * Control creep number in each room
 * @param interval
 * @param room
 */
export function creepControl(interval = 10, room: Room): void {
  // Wrong time do nothing
  if (Game.time % interval) {
    return;
  }
  // Last time task hasn't been done
  if (room.topCreepTask()) {
    return;
  }
  const minLevel = room.creepMinLevel();
  const maxLevel = room.creepMaxLevel();
  room.memory.baseCreepExceptList = baseExceptCreepNum[roomStage(room)];
  if (!room.memory.baseCreepList) {
    room.memory.baseCreepList = baseCreepNumInit;
  }
  for (const role in room.memory.baseCreepExceptList) {
    const toSpawn =
      room.memory.baseCreepExceptList[role as BaseRoleConstant] - room.memory.baseCreepList[role as BaseRoleConstant];
    if (toSpawn > 0) {
      creepApi.add(role as BaseRoleConstant, toSpawn, room.name, true, minLevel, maxLevel);
    }
  }
}
