interface AutoPlanController {
  autoPlanContainer(sourcePos: RoomPosition): RoomPosition;
  autoPlanCore(room: Room): ScreepsPosition;
}
