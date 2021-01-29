import mount from './mount';
import { creepSetup, roomSetup, structureSetup } from './init';

/**
 * AI Start
 */
mount();
export function loop(): void {
  roomSetup();
  creepSetup();
  structureSetup();
}
