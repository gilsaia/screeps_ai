import { BaseAutoPlan } from './base';
import container from './container';
import { GetCorePos } from './core';

export const autoPlanController: AutoPlanController = {
  autoPlanContainer: container,
  autoPlanCore: GetCorePos,
  autoPlanBase: BaseAutoPlan
};
