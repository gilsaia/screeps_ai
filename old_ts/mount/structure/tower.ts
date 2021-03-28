export class towerExtend extends StructureTower {
  public work(): void {
    let res: boolean;
    res = this.dailyFindEnemy();
    if (!res) {
      res = this.dailyRepair();
    }
    this.energyRequire(400);
    return;
  }
  private dailyFindEnemy(): boolean {
    const enemies = this.findEnemy(10);
    if (enemies.length <= 0) {
      return false;
    }
    this.attack(enemies[0]);
    return true;
  }
  private dailyRepair(): boolean {
    if (!this.room.memory.towerTask) {
      if (!this.room.topRepairTask()) {
        return false;
      }
      this.room.memory.towerTask = this.room.takeRepairTask() as RepairTask;
    }
    const task = this.room.memory.towerTask;
    const structure = Game.getObjectById(task.id);
    if (!structure) {
      delete this.room.memory.towerTask;
      return false;
    }

    this.repair(structure);
    if (structure.hits + 300 >= structure.hitsMax) {
      delete this.room.memory.towerTask;
    }
    return true;
  }
  private findEnemy(interval = 1): (Creep | PowerCreep)[] {
    if (!this.room.memory.enemies) {
      this.room.memory.enemies = [];
    }
    // Already has enemy then every tick check
    if (this.room.memory.enemies.length) {
      this.room.memory.enemies = this.room.find(FIND_HOSTILE_CREEPS);
      this.room.memory.enemies.concat(this.room.find(FIND_HOSTILE_POWER_CREEPS));
      return this.room.memory.enemies;
    }
    if (Game.time % interval) {
      return this.room.memory.enemies;
    }
    this.room.memory.enemies = this.room.find(FIND_HOSTILE_CREEPS);
    this.room.memory.enemies.concat(this.room.find(FIND_HOSTILE_POWER_CREEPS));
    return this.room.memory.enemies;
  }
  private energyRequire(lowerBound: number): void {
    if (!this.room.memory.fillTowerTaskAlloc && this.store.getUsedCapacity(RESOURCE_ENERGY) < lowerBound) {
      this.room.memory.fillTowerTaskAlloc = true;
      this.room.addTransportTask(RESOURCE_ENERGY, 'fillTower', 2);
    }
    return;
  }
}
