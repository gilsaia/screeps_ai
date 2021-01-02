import mount from './mount';
import { creepSetup, structureSetup } from './init';

/**
 * AI Start
 */
export function loop(): void {
  mount();
  creepSetup();
  structureSetup();
}
