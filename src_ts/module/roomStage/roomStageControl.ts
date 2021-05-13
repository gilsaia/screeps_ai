import { autoPlanController } from '../autoPlan';

const stageFunctionSet: updateStageFunctionSet = {
  0: {
    // 目前无紧急情况设置 处于初始/紧急情况时立刻升级
    updateStage(room: Room): boolean {
      return true;
    }
  },
  1: {
    // RCL达到2则升级
    updateStage(room: Room): boolean {
      if (room.controller && room.controller.my) {
        return room.controller.level >= 2;
      }
      return false;
    }
  },
  2: {
    // 目前房间阶段升级策略暂无
    updateStage(room: Room): boolean {
      return false;
    }
  }
};
// 状态切换映射表
const stageMap: { [stage: number]: StageCode } = {
  0: STAGE_START,
  1: STAGE_TWO
};
// creep生产等级升级表
const creepStageMap: { [stage: number]: number } = {
  0: 300,
  1: 550,
  2: 800
};

export class RoomStageController implements RoomStageControl {
  public getStage(): StageCode {
    return this.stage;
  }
  public getCreepStage(): StageCode {
    return this.creepStage;
  }

  public checkForUpdate(room: Room): void {
    // 检测当前房间是否可升级至下一阶段 若升级则进行自动规划步骤
    const checkFunction = stageFunctionSet[this.stage];
    if (checkFunction.updateStage(room)) {
      this.stage = stageMap[this.stage];
      autoPlanController.autoPlanBase(room, this.stage);
    }
    // 检测当前房间是否可以生产下一阶段creep
    if (room.energyCapacityAvailable >= creepStageMap[this.creepStage]) {
      this.creepStage = stageMap[this.creepStage];
    }
  }
  public constructor() {
    this.stage = STAGE_URGENT;
    this.creepStage = STAGE_URGENT;
  }
  private stage: StageCode;
  private creepStage: StageCode;
}
