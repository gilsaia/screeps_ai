import { pollingQueue } from '../../module/pollingQueue/queue';
import { genPollingBuildTask } from '../../module/tasks/work/build';

export class ExtensionRoomPosition extends RoomPosition {
  public createCustomConstructionSite(structureType: BuildableStructureConstant): ScreepsReturnCode {
    const pos: ScreepsPosition = {
      x: this.x,
      y: this.y
    };
    const task = genPollingBuildTask(this.roomName, pos);
    pollingQueue.registerTask(task);
    return this.createConstructionSite(structureType);
  }
}
