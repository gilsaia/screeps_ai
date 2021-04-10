export const TransferAction: {
  [taskType in TransferTaskType]: TransferActionGenerator<taskType>;
} = {
  fillExtension: (creep, task) => ({
    run(): TaskReturnCode {
      let structure;
      if (task.fillId) {
        structure = Game.getObjectById(task.fillId);
      } else {
        structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: s =>
            (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
      }
      if (!structure) {
        delete task.fillId;
        return TASK_COMPLETE;
      }
      task.fillId = structure.id;
      const err = creep.transfer(structure, RESOURCE_ENERGY);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(structure);
      } else if (err === ERR_FULL) {
        delete task.fillId;
      }
      if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
        delete task.fillId;
        return TASK_COMPLETE;
      }
      if (creep.store[RESOURCE_ENERGY] === 0) {
        return TASK_SWITCH;
      }
      return TASK_CONTINUE;
    }
  }),
  fillTower: (creep, task) => ({
    run(): TaskReturnCode {
      const structure = Game.getObjectById(task.id);
      if (!structure) {
        return TASK_ERR;
      }
      const err = creep.transfer(structure, RESOURCE_ENERGY);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(structure);
      } else if (err === ERR_FULL) {
        return TASK_COMPLETE;
      }
      if (creep.store[RESOURCE_ENERGY] === 0) {
        return TASK_SWITCH;
      }
      return TASK_CONTINUE;
    }
  })
};
