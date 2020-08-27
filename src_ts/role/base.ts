const baseSource = (creep: Creep): boolean => {
  if (!creep.memory.source) {
    console.log('Wrong Source!');
    return false;
  }
  const source = Game.getObjectById<Source>(creep.memory.source);
  if (!source) {
    creep.memory.source = undefined;
    return false;
  }
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
  return true;
};
const baseSwitch = (creep: Creep): boolean => {
  if (creep.memory.working) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
      return true;
    }
  } else {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      return true;
    }
  }
  return false;
};
export const baseRoles: {
  [role in BaseRoleConstant]: CreepFunction;
} = {
  harvester: {
    source: baseSource,
    target: (creep: Creep): boolean => {
      const structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: s =>
          (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
          s.store.getUsedCapacity(RESOURCE_ENERGY) < s.store.getCapacity(RESOURCE_ENERGY)
      });
      if (!structure) {
        console.log('No Empty Structure!');
        return false;
      }
      if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(structure);
      }
      return true;
    },
    switch: baseSwitch
  },
  upgrader: {
    source: baseSource,
    target: (creep: Creep): boolean => {
      const controller = creep.room.controller;
      if (!controller) {
        console.log('No Controller!');
        return false;
      }
      if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }
      return true;
    },
    switch: baseSwitch
  },
  builder: {
    source: baseSource,
    target: (creep: Creep): boolean => {
      const site = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
      if (!site) {
        const structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: s => s.hits < s.hitsMax
        });
        if (!structure) {
          console.log('No Structure To Repair Or Build');
          return false;
        }
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
        return true;
      } else {
        if (creep.build(site) === ERR_NOT_IN_RANGE) {
          creep.moveTo(site);
        }
        return true;
      }
    },
    switch: baseSwitch
  }
};
