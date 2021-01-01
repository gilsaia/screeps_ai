import { numberConfig } from '../config';

export function setupCreepControl(): void {
  for (const name in Game.spawns) {
    const room = Game.spawns[name].room;
    if (!room.memory.creepControl) {
      checkCreep(room);
      room.memory.creepControl = true;
    }
  }
  for (const name in Game.spawns) {
    const room = Game.spawns[name].room;
    if (room.memory.creepControl) {
      room.memory.creepControl = false;
    }
  }
}
function checkCreep(room: Room): void {
  for (const role in numberConfig) {
    if (!room.memory.creepList) {
      room.changeCreepList(role as RoleConstant, 0);
      return;
    }
    if (room.memory.creepList[role as RoleConstant] < numberConfig[role as RoleConstant]) {
      room.addSpawnTask(role);
    }
  }
}
