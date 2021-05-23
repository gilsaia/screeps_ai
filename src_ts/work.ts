export function StructureWork(): void {
  for (const structureId in Game.structures) {
    const structure = Game.structures[structureId];
    if (structure.work) {
      structure.work();
    }
  }
  return;
}
