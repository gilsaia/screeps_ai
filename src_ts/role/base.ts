import { baseRoleValid } from '../utils';

const baseCount = (creep: Creep, interval: number): void => {
  if (!baseRoleValid(creep.memory.role)) {
    return;
  }
  if (Game.time % interval) {
    return;
  }
  ++creep.room.memory.baseCreepList[creep.memory.role];
  return;
};
const baseSource = (creep: Creep): boolean => {
  console.log('hold position');
  return true;
};
export const baseRoles: { [role in BaseRoleConstant]: CreepConfig } = {
  harvester: { count: baseCount, source: baseSource },
  upgrader: { count: baseCount, source: baseSource },
  worker: { count: baseCount, source: baseSource }
};
