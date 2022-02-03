import * as _ from 'lodash';
import { getMockGame } from './game';
import { getMockMemory } from './memory';
/**
 * 刷新游戏环境
 * 将 global 改造成类似游戏中的环境
 */
export const refreshGlobalMock = function (): void {
  global.Game = getMockGame();
  global.Memory = getMockMemory();
  global._ = _;
  // 下面的 @screeps/common/lib/constants 就是所有的全局常量
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Object.assign(global, require('@screeps/common/lib/constants'));
};
