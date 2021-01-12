import { creepApi } from '../module/creepControl';
import { sourceApi, updateRoomStage } from '../module/roomStage';
import { baseRoleValid, findWalkableDir } from '../utils';

const baseCount = (creep: Creep, interval: number): void => {
  if (Game.time % interval) {
    return;
  }
  if (!baseRoleValid(creep.memory.role)) {
    return;
  }
  ++creep.room.memory.baseCreepList[creep.memory.role];
  return;
};
const harvestSource = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as harvesterData;
  const source = Game.getObjectById(data.sourceId);
  if (!source) {
    console.log('err sourceId check now!');
    return false;
  }
  if (!creep.pos.isEqualTo(data.containerPosX, data.containerPosY)) {
    creep.moveTo(data.containerPosX, data.containerPosY);
  }
  creep.harvest(source);
  return true;
};
const harvestTarget = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as harvesterData;
  if (creep.pos.isEqualTo(data.containerPosX, data.containerPosY)) {
    const dir = findWalkableDir(creep.pos);
    creep.move(dir);
  }
  const constructionSite = Game.getObjectById(data.containerId) as ConstructionSite;
  const err = creep.build(constructionSite);
  if (err === ERR_NOT_IN_RANGE) {
    creep.moveTo(data.containerPosX, data.containerPosY);
  } else if (err === ERR_INVALID_TARGET) {
    if (sourceApi.checkSource(creep.room, true, data.sourceId)) {
      updateRoomStage(creep.room);
      const sourceCondition = sourceApi.searchSource(creep.room, data.sourceId) as SourceCondition;
      data.containerId = sourceCondition.containerId;
      data.complete = sourceCondition.complete;
    }
  }
  return true;
};
const baseSource = (creep: Creep): boolean => {
  console.log('hold position');
  return true;
};
export const baseRoles: { [role in BaseRoleConstant]: CreepConfig } = {
  harvester: { count: baseCount, source: harvestSource, target: harvestTarget },
  upgrader: { count: baseCount, source: baseSource },
  worker: { count: baseCount, source: baseSource }
};
