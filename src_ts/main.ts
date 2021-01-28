import { creepControlInterval, repairCheckInterval } from './config';
import { autoPlan } from './module/autoPlan';
import { creepControl } from './module/creepControl';
import { repairCheck } from './module/repairCheck';
import mount from './mount';
import { creepSetup, structureSetup } from './init';

/**
 * AI Start
 */
mount();
export function loop(): void {
  autoPlan();
  creepSetup();
  creepControl(creepControlInterval);
  repairCheck(repairCheckInterval);
  structureSetup();
}
