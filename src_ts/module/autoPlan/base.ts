import { autoPlanBaseList } from './config';
import { GetCorePos } from './core';

export function BaseAutoPlan(room: Room, stage: StageCode): void {
  const memory = room.memory;
  if (!memory.corePos) {
    memory.corePos = GetCorePos(room);
  }
  // 基地内部规划
  const planList = autoPlanBaseList[stage];
  for (const item of planList) {
    for (const pos of item.point) {
      if (!pos) {
        // 不能预先确定未知的建筑 后期补充 包括link extractor等
        continue;
      }
      const structurePos = new RoomPosition(memory.corePos.x + pos[0], memory.corePos.y + pos[1], room.name);
      structurePos.createCustomConstructionSite(item.StructureType);
    }
  }
  // 房间整体规划
}
