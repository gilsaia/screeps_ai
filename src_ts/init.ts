import { pollingQueue } from './module/pollingQueue/queue';
import { energyCheckTask } from './module/sourceControl/energyControl';

const pollingTasks = [energyCheckTask];

export function pollingSetup(): void {
  for (const task of pollingTasks) {
    pollingQueue.registerTask(task);
  }
}
