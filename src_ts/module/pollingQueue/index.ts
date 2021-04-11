import { energyCheckTask } from '../sourceControl/energyControl';
import { fillExtensionCheckTask } from '../tasks/transfer/fillExtension';
import { pollingQueue } from './queue';
// const pollingTasks: PollingTask[] = [energyCheckTask];
const pollingRoomTasks: PollingRoomTask[] = [energyCheckTask, fillExtensionCheckTask];

export function pollingSetup(): void {
  pollingRoomTasks.forEach(task => pollingQueue.registerRoomTask(task));
}
