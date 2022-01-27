import { circleQueue } from './index';
import { random } from 'lodash';

it('初始化', () => {
  const queue: circleQueue<number> = new circleQueue<number>(10);
  expect(queue).toBeDefined();
});

it('获取/设置第k个', () => {
  const queue: circleQueue<number> = new circleQueue<number>(10);
  queue.set(20);
  expect(queue.getNextK(0)).toEqual(20);
  queue.setNextK(23, 45);
  expect(queue.getNextK(23)).toEqual(45);
});

it('获取/完成机制', () => {
  const queue: circleQueue<number> = new circleQueue<number>(10);
  queue.set(10);
  expect(queue.check()).toEqual(10);
  queue.setNextK(1, 1039);
  queue.finish();
  expect(queue.check()).toEqual(1039);
});

it('循环测试', () => {
  const queue: circleQueue<number> = new circleQueue<number>(13);
  const items = [];
  for (let i = 0; i < 50; ++i) {
    items.push(random());
  }
  for (let i = 0; i < 50; ++i) {
    expect(queue.check()).not.toEqual(items[i]);
    queue.set(items[i]);
    expect(queue.check()).toEqual(items[i]);
    queue.finish();
  }
});
