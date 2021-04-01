/**
 * AI Start
 */
import { pollingQueue } from './module/pollingQueue/queue';

// mount();
export function loop(): void {
  // 轮询任务检测
  pollingQueue.run();
  console.log('test');
}
