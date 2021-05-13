interface AutoPlanController {
  autoPlanContainer(sourcePos: RoomPosition): RoomPosition;
  autoPlanCore(room: Room): ScreepsPosition;
  autoPlanBase(room: Room, stage: StageCode): void;
}
interface AutoPlanItem {
  StructureType: BuildableStructureConstant;
  point: ([number, number] | null)[];
}
interface RoomMemory {
  corePos: ScreepsPosition;
}
