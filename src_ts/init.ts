export function creepSetup(): void {
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
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
