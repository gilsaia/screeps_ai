import { getMock } from './utils';

/**
 * 伪造的全局 Memory 类
 */
export class MemoryMock {
  public creeps = {};
  public rooms = {};
}

/**
 * 创建一个伪造的 Memory 实例
 */
export const getMockMemory = getMock<Memory>(MemoryMock);
