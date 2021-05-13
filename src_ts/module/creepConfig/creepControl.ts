import { RoomStageApi } from '../roomStage';
import { TaskApi } from '../tasks';
import { BaseCreepNumberLimit } from './config';

export const creepControlTask: PollingTask = {
  check(data: standardData) {
    console.log(data.taskName);
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (!room.controller || !room.controller.my) {
        continue;
      }
      Game.rooms[roomName]._baseCreepControl = {
        harvester: 0,
        upgrader: 0,
        worker: 0,
        transfer: 0
      };
    }
    for (const creepName in Game.creeps) {
      const creep = Game.creeps[creepName];
      if (!isBaseCreepRole(creep.memory.role)) {
        continue;
      }
      Game.rooms[creep.memory.room]._baseCreepControl[creep.memory.role] += 1;
    }
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (!room.controller || !room.controller.my) {
        continue;
      }
      const creepStage = RoomStageApi.getRoomCreepStage(room);
      for (const role in BaseCreepNumberLimit) {
        const needNum =
          BaseCreepNumberLimit[role as BaseCreepRole][creepStage] - room._baseCreepControl[role as BaseCreepRole];
        if (needNum > 0) {
          const task: CreepTasks[spawnCreep] = {
            type: 'spawnCreep',
            key: role,
            need: needNum,
            priority: 5,
            role: role as CreepRole
          };
          TaskApi.addCreepTask(room, task);
        }
      }
    }
  },
  data: {
    taskName: 'Base Creep Num Control'
  },
  interval: 30,
  repeat: true,
  immediate: true
};

function isBaseCreepRole(role: CreepRole): role is BaseCreepRole {
  switch (role) {
    case 'harvester':
    case 'transfer':
    case 'upgrader':
    case 'worker':
      return true;
  }
  // return false;
}
