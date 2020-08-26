import { SOURCE_MAX_WORKER } from 'config';

export class RoomCreepControl extends Room {
  public findSource(role: RoleConstant): Id<any> | undefined {
    let source: Id<any> | undefined;
    let nowWorker: number = SOURCE_MAX_WORKER;
    if (!this.memory.sourceList) {
      this.memory.sourceList = [];
      this.storeSource();
    }
    if (role === 'harvester') {
      // TODO 不同角色寻找不同资源建筑
    }
    for (const sourceConfig of this.memory.sourceList) {
      if (sourceConfig.worker <= nowWorker) {
        source = sourceConfig.id;
        nowWorker = sourceConfig.worker;
      }
    }
    return source;
  }
  public addWorker(id: Id<any> | undefined): boolean {
    if (!id) {
      return false;
    }
    if (!this.memory.sourceList) {
      this.memory.sourceList = [];
      this.storeSource();
    }
    for (const sourceConfig of this.memory.sourceList) {
      if (sourceConfig.id === id) {
        return true;
      }
    }
    return false;
  }
  public storeSource(): void {
    if (!this.memory.sourceList) {
      this.memory.sourceList = [];
    }
    const sources = this.find<FIND_SOURCES>(FIND_SOURCES);
    for (const source of sources) {
      this.memory.sourceList.push({ id: source.id, worker: 0 });
    }
  }
}
