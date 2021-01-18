import { creepApi } from '../module/creepControl';
import { sourceApi, updateRoomStage } from '../module/roomStage';
import { taskApi } from '../module/taskHandle';

const baseSource = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as upgraderData | workerData;
  const source = Game.getObjectById(data.sourceId) as Source | Structure<StructureConstant>;
  if ((source as Structure<StructureConstant>).structureType) {
    if (creep.withdraw(source as Structure<StructureConstant>, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  } else {
    if (creep.harvest(source as Source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
  return true;
};
const baseTargetSwitch = (creep: Creep): boolean => {
  return creep.store.getUsedCapacity() === 0;
};
const baseSourceSwitch = (creep: Creep): boolean => {
  return creep.store.getFreeCapacity() === 0;
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
  const constructionSite = Game.getObjectById(data.containerId) as ConstructionSite;
  const err = creep.build(constructionSite);
  if (err === ERR_NOT_IN_RANGE) {
    creep.moveTo(data.containerPosX, data.containerPosY);
  } else if (err === ERR_INVALID_TARGET) {
    if (sourceApi.checkSource(creep.room, true, data.sourceId)) {
      updateRoomStage(creep.room);
      const sourceCondition = sourceApi.searchSource(creep.room, data.sourceId) as SourceCondition;
      data.containerId = sourceCondition.containerId as Id<ConstructionSite | Structure<StructureConstant>>;
      data.complete = sourceCondition.complete;
    }
  }
  return true;
};
const harvestTargetSwitch = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as harvesterData;
  if (data.complete) {
    return true;
  }
  return baseTargetSwitch(creep);
};
const harvestSourceSwitch = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as harvesterData;
  if (data.complete) {
    return false;
  }
  return baseSourceSwitch(creep);
};
const upgradeTarget = (creep: Creep): boolean => {
  if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller as StructureController);
  }
  return true;
};
const workTarget = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as workerData;
  if (!data.task) {
    data.task = taskApi.alloc(creep.room, 1);
  }
  if (data.task) {
    const err = taskApi.exec(creep, data.task);
    if (err === OK) {
      taskApi.finish(creep.room, data.task, false);
      delete data.task;
    }
  }
  return true;
};
const fillTarget = (creep: Creep): boolean => {
  if (!creep.memory.data) {
    creepApi.init(creep);
  }
  const data = creep.memory.data as fillerData;
  if (!data.task) {
    data.task = taskApi.alloc(creep.room, 0);
  }
  if (data.task) {
    const err = taskApi.exec(creep, data.task);
    if (err === OK) {
      taskApi.finish(creep.room, data.task, false);
      delete data.task;
    }
  }
  return true;
};
export const baseRoles: { [role in BaseRoleConstant]: CreepConfig } = {
  harvester: {
    source: harvestSource,
    target: harvestTarget,
    sourceSwitch: harvestSourceSwitch,
    targetSwitch: harvestTargetSwitch
  },
  upgrader: {
    source: baseSource,
    target: upgradeTarget,
    sourceSwitch: baseSourceSwitch,
    targetSwitch: baseTargetSwitch
  },
  worker: { source: baseSource, target: workTarget, sourceSwitch: baseSourceSwitch, targetSwitch: baseTargetSwitch },
  filler: { source: baseSource, target: fillTarget, sourceSwitch: baseSourceSwitch, targetSwitch: baseTargetSwitch }
};
