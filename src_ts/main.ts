/**
 * AI Start
 */
import { pollingSetup } from './init';
import { pollingQueue } from './module/pollingQueue/queue';

// mount();
pollingSetup();
export function loop(): void {
  // 轮询任务检测
  pollingQueue.run();
  console.log('test');
}
