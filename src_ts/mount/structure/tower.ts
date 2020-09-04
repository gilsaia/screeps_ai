export class TowerExtend extends StructureTower {
  public work(): void {
    const enemy = this.findEnemy();
    if (enemy.length <= 0) {
      return;
    }
    this.fire(enemy);
    return;
  }
  private findEnemy(): (Creep | PowerCreep)[] {
    return this.room.find(FIND_HOSTILE_CREEPS);
  }
  private fire(enemy: (Creep | PowerCreep)[]): void {
    const target = this.pos.findClosestByRange(enemy);
    if (!target) {
      return;
    }
    this.attack(target);
    return;
  }
}
