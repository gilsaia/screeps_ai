export const WorkAction: {
  [task in WorkTaskType]: WorkActionGenerator<task>;
} = {
  build: (creep, task) => ({
    run(): TaskReturnCode {
      const site = Game.getObjectById(task.id);
      if (!site) {
        return TASK_COMPLETE;
      }
      const err = creep.build(site);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(site);
      }
      if (creep.store[RESOURCE_ENERGY] === 0) {
        return TASK_SWITCH;
      }
      return TASK_CONTINUE;
    }
  }),
  repair: (creep, task) => ({
    run(): TaskReturnCode {
      const structure = Game.getObjectById(task.id);
      if (!structure) {
        return TASK_ERR;
      }
      const err = creep.repair(structure);
      if (err === ERR_NOT_IN_RANGE) {
        creep.moveTo(structure);
      }
      if (structure.hits === structure.hitsMax) {
        return TASK_COMPLETE;
      }
      if (creep.store[RESOURCE_ENERGY] === 0) {
        return TASK_SWITCH;
      }
      return TASK_CONTINUE;
    }
  })
};
