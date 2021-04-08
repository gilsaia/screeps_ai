/**
 * AI Start
 */
import { init } from './init';
import { pollingQueue } from './module/pollingQueue/queue';

init();
export function loop(): void {
  // 轮询任务检测
  pollingQueue.run();
}
