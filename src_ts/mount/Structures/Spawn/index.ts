import _ from 'lodash';
import { CreepConfigApi } from '../../../module/creepConfig';
import { RoomStageApi } from '../../../module/roomStage';
import { TaskApi } from '../../../module/tasks';

export class ExtensionSpawn extends StructureSpawn {
  public work(): void {
    if (this.spawning) {
      return;
    }
    const room = this.room;
    let task = this.memory.task;
    if (!task) {
      task = TaskApi.getCreepTask(room);
      this.memory.task = task;
    }
    if (!task) {
      return;
    }
    const stage = RoomStageApi.getRoomCreepStage(room);
    const body = CreepConfigApi.getBaseCreepBodyPart(task.role, stage);
    const creepName = task.role + room.name + _.random(100, 1000).toString();
    const err = this.spawnCreep(body, creepName, {
      memory: {
        role: task.role,
        room: room.name
      }
    });
    if (err === OK) {
      delete this.memory.task;
    }
    return;
  }
}
