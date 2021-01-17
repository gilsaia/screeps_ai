/**
 * Handle different task
 */
export const taskApi = {
  exec(creep: Creep, task: RoomTask): ScreepsReturnCode {
    let structure;
    let err: ScreepsReturnCode = OK;
    switch (task.taskType) {
      case 'transport':
        switch (task.transportType) {
          case 'fillExtension':
            structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
              filter: s =>
                (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
                s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            if (!structure) {
              // Wrong Id omit the task
              console.log('Wrong Id');
              return OK;
            }
            err = creep.transfer(structure, task.resourceType);
            if (err === ERR_NOT_IN_RANGE) {
              creep.moveTo(structure);
            } else if (err === ERR_FULL) {
              err = OK;
            }
            break;
        }
        break;
    }
    return err;
  }
};
