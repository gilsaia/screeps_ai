import { circleQueue } from './index';

it('可以正常初始化', () => {
  const queue: circleQueue<number> = new circleQueue<number>(10);
  queue.set(10);
  expect(queue.check()).toBe(10);
});
