import { setupCreepControl } from './module/creepControl';

export function creepSetup(): void {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      Game.rooms[Memory.creeps[name].room]?.changeCreepList(Memory.creeps[name].role, -1);
      Game.rooms[Memory.creeps[name].room]?.changeWorker(Memory.creeps[name].source, -1);
      delete Memory.creeps[name];
    } else {
      Game.creeps[name].work();
    }
  }
}
export function spawnSetup(): void {
  if (!(Game.time % 20)) {
    console.log('Begin Creep Control');
    setupCreepControl();
    console.log('Creep Control End');
  }
  for (const name in Game.spawns) {
    Game.spawns[name].work();
  }
}
