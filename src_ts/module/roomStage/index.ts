import { RoomStageController } from './roomStageControl';

export const RoomStageApi: BasicRoomStageApi = {
  getRoomStage(room: Room): StageCode {
    if (!room._roomStageController) {
      room._roomStageController = new RoomStageController();
    }
    return room._roomStageController.getStage();
  },
  getRoomCreepStage(room: Room): StageCode {
    if (!room._roomStageController) {
      room._roomStageController = new RoomStageController();
    }
    return room._roomStageController.getCreepStage();
  },
  getRoomStageComplete(room: Room): StageCode {
    if (!room._roomStageController) {
      room._roomStageController = new RoomStageController();
    }
    room._roomStageController.checkForUpdate(room);
    return room._roomStageController.getStage();
  }
};
