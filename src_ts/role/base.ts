import { sourceApi } from "../module/roomStage";
import { baseRoleValid } from "../utils";

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
const harvestSource = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    const sourceId = sourceApi.allocSource(creep.room);
    const source = Game.getObjectById(sourceId);
    if (!source) {
      console.log('err sourceId check now!');
      return false;
    }
    creep.memory.data = {
      sourceId,
      room: creep.room.name,
      sourcePosX: source.pos.x,
      sourcePosY: source.pos.y
    };
  }
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
