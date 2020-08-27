import { creepSetup, spawnSetup } from './init';
import mount from './mount';

// screeps 代码入口
export function loop(): void {
  mount();
  creepSetup();
  spawnSetup();
}
