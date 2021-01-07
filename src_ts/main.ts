import { creepControlInterval } from './config';
import { creepControl } from './module/creepControl';
import mount from './mount';
import { creepSetup, structureSetup } from './init';

/**
 * AI Start
 */
export function loop(): void {
  mount();
  creepSetup();
  creepControl(creepControlInterval);
  structureSetup();
}
