// Spawn
interface StructureSpawn {
  work(): void;
  spawningTask(task: string): OK | ERR_NOT_ENOUGH_ENERGY | ERR_RCL_NOT_ENOUGH | ERR_NAME_EXISTS
}
// Room
interface Room {
  // 生产队列api
  addSpawnTask(task: string): OK | ERR_NAME_EXISTS;
  hasSpawnTask(task: string): boolean;
  lenSpawnTask(): number;
  topSpawnTask(): string | undefined;
  takeSpawnTask(): string | undefined;
}
// RoomMemory
interface RoomMemory {
  // creep数量控制
  creepList?: Map<string, number>;
  // 房间生产队列
  spawnList?: string[];
}
// `global` extension samples
declare namespace NodeJS {
  interface Global {
    hasMount: boolean;
  }
}
