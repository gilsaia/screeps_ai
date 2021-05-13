import { RoomStageApi } from './index';

export const checkRoomStageTask: PollingRoomTask = {
  check(data: standardData, room: Room) {
    console.log(data.taskName);
    RoomStageApi.getRoomStageComplete(room);
  },
  data: {
    taskName: 'Check Room Stage'
  },
  interval: 30,
  repeat: true,
  allRoom: false
};
