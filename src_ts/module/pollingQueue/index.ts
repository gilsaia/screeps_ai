import { energyCheckTask } from '../sourceControl/energyControl';
import { pollingQueue } from './queue';
const pollingTasks: PollingTask[] = [energyCheckTask];

export function pollingSetup(): void {
  pollingTasks.forEach(task => pollingQueue.registerTask(task));
}
