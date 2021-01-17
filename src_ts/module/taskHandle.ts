/**
 * Handle different task
 */
export const taskApi = {
  exec(creep: Creep, task: RoomTask): ScreepsReturnCode {
    let structure;
    let err: ScreepsReturnCode = OK;
    switch (task.taskType) {
      case TaskType.transport:
        structure = Game.getObjectById(task.id);
        if (!structure) {
          // Wrong Id omit the task
          console.log('Wrong Id');
          return OK;
        }
        err = creep.transfer(structure, task.resourceType);
        if (err === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
        break;
    }
    return err;
  }
};
