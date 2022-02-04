import { getMock } from './utils';

/**
 * 伪造的全局 Game 类
 */
export class GameMock {
  public creeps = {};
  public rooms = {
    W1N1: {},
    W2N2: {}
  };
  public spawns = {};
  public time = 1;
}

/**
 * 创建一个伪造的 Game 实例
 */
export const getMockGame = getMock<Game>(GameMock);
