/**
 * 伪造的全局 Game 类
 */
import { getMock } from './utils';

export class GameMock {
  public creeps = {};
  public rooms = {};
  public spawns = {};
  public time = 1;
}

/**
 * 创建一个伪造的 Game 实例
 */
export const getMockGame = getMock<Game>(GameMock)