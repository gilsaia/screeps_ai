import { TaskApi } from '../index';

export const fillExtensionCheckTask: PollingRoomTask = {
  check(data: standardData, room: Room) {
    console.log(data.taskName);
    if (room.energyAvailable < room.energyCapacityAvailable) {
      const task: TransferTasks[fillExtension] = {
        type: 'fillExtension',
        key: 'fillExtension',
        priority: 5,
        need: 2
      };
      TaskApi.addTransferTask(room, task);
    }
  },
  data: {
    taskName: 'Check Extension Need Energy'
  },
  interval: 10,
  repeat: true,
  allRoom: false
};
