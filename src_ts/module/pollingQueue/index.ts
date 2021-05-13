import { creepControlTask } from '../creepConfig/creepControl';
import { checkRoomStageTask } from '../roomStage/checkRoomStage';
import { energyCheckTask } from '../sourceControl/energyControl';
import { fillExtensionCheckTask } from '../tasks/transfer/fillExtension';
import { pollingQueue } from './queue';
const pollingTasks: PollingTask[] = [creepControlTask];
const pollingRoomTasks: PollingRoomTask[] = [energyCheckTask, fillExtensionCheckTask, checkRoomStageTask];

export function pollingSetup(): void {
  pollingTasks.forEach(task => pollingQueue.registerTask(task));
  pollingRoomTasks.forEach(task => pollingQueue.registerRoomTask(task));
}
