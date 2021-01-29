import { creepControlInterval, repairCheckInterval } from './config';
import { autoPlan } from './module/autoPlan';
import { creepApi, creepControl } from './module/creepControl';
import { repairCheck } from './module/repairCheck';

export function creepSetup(): void {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      creepApi.finish(Memory.creeps[name]);
      delete Memory.creeps[name];
    } else {
      Game.creeps[name].work();
    }
  }
}
export function structureSetup(): void {
  for (const name in Game.structures) {
    const structure = Game.structures[name];
    if (structure.work) {
      structure.work();
    }
  }
}
export function roomSetup(): void {
  for (const name in Game.rooms) {
    const room = Game.rooms[name];
    // Doing thing in all room
    // Doing thing in controlled room
    if (!(room.controller && room.controller.my)) {
      continue;
    }
    autoPlan(room);
    creepControl(creepControlInterval, room);
    repairCheck(repairCheckInterval, room);
  }
  return;
}
