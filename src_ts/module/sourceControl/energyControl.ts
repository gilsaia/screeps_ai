import { autoPlanController } from '../autoPlan';

export class EnergyControl implements EnergyController {
  private harvestNum = 0;
  public getEnergyHarvestSource(room: Room): SourceCondition {
    if (!room.memory.sourceCondition) {
      sourceInit(room);
    }
    this.harvestNum = (this.harvestNum + 1) % room.memory.sourceCondition.length;
    return room.memory.sourceCondition[this.harvestNum];
  }
  public editBaseSource(baseSourcePos: RoomPosition[]): void {
    this.baseSourcePos = baseSourcePos;
    let maxEnergy = 0;
    for (const pos of baseSourcePos) {
      const sourceRes = pos.lookFor(LOOK_SOURCES);
      if (sourceRes && sourceRes[0]) {
        if (sourceRes[0].energy > maxEnergy) {
          maxEnergy = sourceRes[0].energy;
          this.cacheBaseSource = sourceRes[0].id;
        }
        continue;
      }
      const containerRes = pos.lookFor(LOOK_STRUCTURES);
      if (containerRes && containerRes[0] && containerRes[0].structureType === STRUCTURE_CONTAINER) {
        if ((containerRes[0] as StructureContainer).store[RESOURCE_ENERGY] > maxEnergy) {
          maxEnergy = (containerRes[0] as StructureContainer).store[RESOURCE_ENERGY];
          this.cacheBaseSource = containerRes[0].id as Id<StructureContainer>;
        }
      }
    }
  }
  private baseSourcePos: RoomPosition[] = [];
  private cacheBaseSource?: Id<Source | StructureContainer>;
  public getEnergyBaseSource(room: Room, pos: RoomPosition): EnergyBaseSource | undefined {
    if (this.cacheBaseSource) {
      return Game.getObjectById(this.cacheBaseSource) as EnergyBaseSource;
    }
    const nearPos = pos.findClosestByRange(this.baseSourcePos);
    const sourceRes = nearPos?.lookFor(LOOK_SOURCES);
    if (sourceRes && sourceRes[0]) {
      return sourceRes[0];
    }
    const containerRes = nearPos?.lookFor(LOOK_STRUCTURES);
    if (containerRes && containerRes[0] && containerRes[0].structureType === STRUCTURE_CONTAINER) {
      return containerRes[0] as StructureContainer;
    }
    return undefined;
  }
}

function sourceInit(room: Room): void {
  room.memory.sourceCondition = [];
  const sources = room.find(FIND_SOURCES);
  for (const source of sources) {
    const sourceCondition: SourceCondition = {
      sourceId: source.id,
      sourcePos: { x: source.pos.x, y: source.pos.y },
      containerPlan: false,
      containerComplete: false,
      containerPos: autoPlanController.autoPlanContainer(source.pos)
    };
    room.memory.sourceCondition.push(sourceCondition);
  }
  return;
}

export const energyCheckTask: PollingTask = {
  check(data: energyCheckData): void {
    console.log(data.taskName);
    for (const roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (!room.memory.sourceCondition) {
        sourceInit(room);
      }
      if (!room._energyController) {
        room._energyController = new EnergyControl();
      }
      const baseSourcePos: RoomPosition[] = [];
      for (const condition of room.memory.sourceCondition) {
        const containerPos = new RoomPosition(condition.containerPos.x, condition.containerPos.y, roomName);
        if (!condition.containerId || Game.getObjectById(condition.containerId)) {
          // 查看是否有已完成建筑
          const structure = containerPos.lookFor(LOOK_STRUCTURES);
          if (structure[0] && structure[0].structureType === STRUCTURE_CONTAINER) {
            condition.containerPlan = true;
            condition.containerComplete = true;
            condition.containerId = structure[0].id as Id<StructureContainer>;

            // 完成则放入建筑位置
            baseSourcePos.push(containerPos);
            continue;
          }

          // 可以确定container未完成 放入能量源位置
          baseSourcePos.push(new RoomPosition(condition.sourcePos.x, condition.sourcePos.y, roomName));

          // 查看是否存在建筑工地
          const site = containerPos.lookFor(LOOK_CONSTRUCTION_SITES);
          if (site[0] && site[0].structureType === STRUCTURE_CONTAINER) {
            condition.containerPlan = true;
            condition.containerComplete = false;
            condition.containerId = site[0].id;
            continue;
          }
          // 对于刚刚放置建筑工地的情况 第一次查不到工地的存在
          if (!condition.containerPlan) {
            condition.containerPlan = true;
            continue;
          }
          // container确定损坏 重新再建
          condition.containerPos = autoPlanController.autoPlanContainer(containerPos);
          condition.containerPlan = false;
          condition.containerComplete = false;
        }
      }
      room._energyController.editBaseSource(baseSourcePos);
    }
  },
  data: { taskName: 'Check Source Condition' },
  interval: 40,
  repeat: true
};
