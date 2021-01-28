/**
 * Find Structure need to repair(exclude wall rampart container)
 * @param interval
 */
export function repairCheck(interval: number): void {
  if (Game.time % interval) {
    return;
  }
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    if (!(room.controller && room.controller.my)) {
      continue;
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
  }
  return;
}
