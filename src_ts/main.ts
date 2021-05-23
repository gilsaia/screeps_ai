/**
 * AI Start
 */
import { init } from './init';
import { pollingQueue } from './module/pollingQueue/queue';
import { StructureWork } from './work';

init();
export function loop(): void {
  // 轮询任务检测
  pollingQueue.run();
  // 建筑执行任务
  StructureWork();
}
