export class RoomSpawnList extends Room {
  public addSpawnTask(task: string): OK | ERR_NAME_EXISTS {
    if (!this.memory.spawnList) {
      this.memory.spawnList = [];
    }
    if (this.hasSpawnTask(task)) {
      return ERR_NAME_EXISTS;
    }
    this.memory.spawnList.push(task);
    return OK;
  }
  public hasSpawnTask(task: string): boolean {
    if (!this.memory.spawnList) {
      this.memory.spawnList = [];
    }
    return this.memory.spawnList.indexOf(task) >= 0;
  }
  public lenSpawnTask(): number {
    if (!this.memory.spawnList) {
      this.memory.spawnList = [];
    }
    return this.memory.spawnList.length;
  }
  public topSpawnTask(): string | undefined {
    if (!this.memory.spawnList) {
      this.memory.spawnList = [];
    }
    if (this.memory.spawnList.length < 1) {
      return undefined;
    }
    return this.memory.spawnList[0];
  }
  public takeSpawnTask(): string | undefined {
    if (!this.memory.spawnList) {
      this.memory.spawnList = [];
    }
    return this.memory.spawnList.shift();
  }
}
