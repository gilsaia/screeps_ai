/**
 * Handle different task
 */
import { towerUpperBound } from '../config';

export const taskApi = {
  alloc(room: Room, permission: RoomTaskPermission): RoomTask | undefined {
    if (permission >= 2) {
      const task = room.takeBuildTask();
      if (task) {
        return task;
      }
    }
    if (permission >= 1) {
      const task = room.takeRepairTask();
      if (task) {
        return task;
      }
    }
    return room.takeTransportTask();
  },
  exec(creep: Creep, task: RoomTask): ScreepsReturnCode {
    let structure;
    let err: ScreepsReturnCode = OK;
    let pos;
    switch (task.taskType) {
      case 'transport':
        switch ((task as TransportTask).transportType) {
          case 'fillExtension':
            if (creep.memory.fillId) {
              structure = Game.getObjectById(creep.memory.fillId);
            } else {
              structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: s =>
                  (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
                  s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
              });
            }
            if (!structure) {
              delete creep.memory.fillId;
              return OK;
            }
            creep.memory.fillId = structure.id;
            err = creep.transfer(structure, (task as TransportTask).resourceType);
            if (err === ERR_NOT_IN_RANGE) {
              creep.moveTo(structure);
            } else if (err === ERR_FULL) {
              delete creep.memory.fillId;
            }
            if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
              err = ERR_BUSY;
            } else {
              delete creep.memory.fillId;
              err = OK;
            }
            break;
          case 'fillTower':
            if (creep.memory.fillId) {
              structure = Game.getObjectById(creep.memory.fillId);
            } else {
              structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: s =>
                  s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < towerUpperBound
              });
            }
            if (!structure || structure.structureType !== STRUCTURE_TOWER) {
              delete creep.memory.fillId;
              return OK;
            }
            creep.memory.fillId = structure.id;
            err = creep.transfer(structure, (task as TransportTask).resourceType);
            if (err === ERR_NOT_IN_RANGE) {
              creep.moveTo(structure);
            } else if (err === ERR_FULL) {
              delete creep.memory.fillId;
            } else if (err === OK) {
              err = ERR_BUSY;
            }
            break;
        }
        break;
      case 'build':
        pos = new RoomPosition((task as BuildTask).point.x, (task as BuildTask).point.y, creep.room.name);
        structure = pos.lookFor(LOOK_CONSTRUCTION_SITES);
        if (!structure[0]) {
          // if current tick just create site
          if (!(task as BuildTask).check) {
            err = ERR_BUSY;
            (task as BuildTask).check = true;
            break;
          } else {
            err = OK;
            break;
          }
        }
        err = creep.build(structure[0]);
        if (err === ERR_NOT_IN_RANGE) {
          creep.moveTo(pos);
        } else if (err === OK) {
          err = ERR_BUSY;
        }
        break;
      case 'repair':
        structure = Game.getObjectById((task as RepairTask).id);
        if (!structure) {
          err = OK;
          break;
        }
        err = creep.repair(structure);
        if (err === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        } else if (err === OK) {
          if (!(structure.hits === structure.hitsMax)) {
            err = ERR_BUSY;
          }
        }
        break;
    }
    return err;
  },
  empty(creep: Creep, room: Room): ScreepsReturnCode {
    if (room.controller) {
      const err = creep.upgradeController(room.controller);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(room.controller);
      }
    }
    return OK;
  },
  finish(room: Room, task: RoomTask, dead: boolean): ScreepsReturnCode {
    switch (task.taskType) {
      case 'transport':
        switch ((task as TransportTask).transportType) {
          case 'fillExtension':
            room.memory.fillExtensionTaskAlloc = false;
            break;
          case 'fillTower':
            room.memory.fillTowerTaskAlloc = false;
            break;
        }
        if (dead) {
          room.addTransportTask((task as TransportTask).resourceType, (task as TransportTask).transportType, 1);
        }
        break;
      case 'build':
        if (dead) {
          room.addBuildTask((task as BuildTask).point, 1);
        }
        break;
      case 'repair':
        if (dead) {
          room.addRepairTask((task as RepairTask).id, 1);
        }
        break;
    }
    return OK;
  }
};
