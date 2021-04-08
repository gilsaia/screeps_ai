import { energyCheckTask } from '../sourceControl/energyControl';
import { pollingQueue } from './queue';
// const pollingTasks: PollingTask[] = [energyCheckTask];
const pollingRoomTasks: PollingRoomTask[] = [energyCheckTask];

export function pollingSetup(): void {
  pollingRoomTasks.forEach(task => pollingQueue.registerRoomTask(task));
}
