export function statsSetup(interval: number): void {
  if (Game.time % interval) {
    return;
  }
  if (!Memory.stats) {
    Memory.stats = { rooms: {} };
  }
  Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100;
  Memory.stats.gclLevel = Game.gcl.level;
  Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100;
  Memory.stats.gplLevel = Game.gpl.level;
  Memory.stats.cpu = Game.cpu.getUsed();
  Memory.stats.bucket = Game.cpu.bucket;
  Memory.stats.credit = Game.market.credits;
  return;
}

export function roomStats(interval: number, room: Room): void {
  if (Game.time % interval) {
    return;
  }
  if (!(room.controller && room.controller.my)) {
    return;
  }
  if (!Memory.stats) {
    Memory.stats = { rooms: {} };
  }
  Memory.stats.rooms[room.name] = {
    controllerRatio: (room.controller.progress / room.controller.progressTotal) * 100,
    controllerLevel: room.controller.level
  };
  return;
}
