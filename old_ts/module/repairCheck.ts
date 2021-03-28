/**
 * Find Structure need to repair(exclude wall rampart container)
 * @param interval
 * @param room
 */
export function repairCheck(interval: number, room: Room): void {
  if (Game.time % interval) {
    return;
  }
  if (room.topRepairTask()) {
    return;
  }
  const structures = room.find(FIND_STRUCTURES, {
    filter: s =>
      s.hits < s.hitsMax &&
      s.structureType !== STRUCTURE_RAMPART &&
      s.structureType !== STRUCTURE_WALL &&
      s.structureType !== STRUCTURE_CONTAINER
  });
  for (const structure of structures) {
    room.addRepairTask(structure.id, 1);
  }
  return;
}
