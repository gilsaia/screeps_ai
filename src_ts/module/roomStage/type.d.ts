type StageCode = STAGE_URGENT | STAGE_START | STAGE_TWO;
type STAGE_URGENT = 0;
type STAGE_START = 1;
type STAGE_TWO = 2;

declare const STAGE_URGENT = 0;
declare const STAGE_START = 1;
declare const STAGE_TWO = 2;

interface BasicRoomStageApi {
  getRoomStage(room: Room): StageCode;
  getRoomStageComplete(room: Room): StageCode;
  getRoomCreepStage(room: Room): StageCode;
}
interface RoomStageControl {
  getStage(): StageCode;
  getCreepStage(): StageCode;
  checkForUpdate(room: Room): void;
}

interface updateStageFunction {
  updateStage(room: Room): boolean;
}

interface updateStageFunctionSet {
  [stage: number]: updateStageFunction;
}

interface Room {
  _roomStageController: RoomStageControl;
}
