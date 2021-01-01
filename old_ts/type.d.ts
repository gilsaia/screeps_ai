// Creep类型
type RoleConstant = BaseRoleConstant;
// Creep基础类型
type BaseRoleConstant = 'harvester' | 'upgrader' | 'builder';
// CreepFunction
interface CreepFunction {
  isReady?: (creep: Creep) => boolean;
  source: (creep: Creep) => boolean;
  target?: (creep: Creep) => boolean;
  switch?: (creep: Creep) => boolean;
}
// Creep
interface Creep {
  work(): void;
  getResource(target: Structure|Source|Mineral|Deposit, resourceType: ResourceConstant): ScreepsReturnCode;
}
// CreepMemory
interface CreepMemory {
  // BaseRole need
  role: RoleConstant;
  working: boolean;
  source?: Id<any>;
  // Transport
  transportTask?: TransportTask;
  // Room
  room: string;
}
// Structure
interface Structure {
  work?(): void;
}
// Spawn
interface StructureSpawn {
  spawningTask(task: string): OK | ERR_NOT_ENOUGH_ENERGY | ERR_RCL_NOT_ENOUGH | ERR_NAME_EXISTS | ERR_INVALID_TARGET;
}
// SourceList
interface SourceList {
  id: Id<any>;
  worker: number;
}
// TransportTask
interface TransportTask {
  fromDes?: Id<any> | string;
  toDes: Id<any> | string;
  resourceType: ResourceConstant;
  amount: number;
}
// Room
interface Room {
  // Source控制
  findSource(role: RoleConstant): Id<any> | undefined;
  changeWorker(id: Id<any> | undefined, changeNum: number): boolean;
  storeSource(): void;
  // Creep控制
  changeCreepList(role: RoleConstant, changeNum: number): void;
  // 生产队列api
  addSpawnTask(task: string): OK | ERR_NAME_EXISTS;
  hasSpawnTask(task: string): boolean;
  lenSpawnTask(): number;
  topSpawnTask(): RoleConstant | undefined;
  takeSpawnTask(): RoleConstant | undefined;
  // 物流队列api
  addTransportTask(task: TransportTask): void;
  takeTransportTask(): TransportTask | undefined;
  topTransportTask(): TransportTask | undefined;
}
// RoomMemory
interface RoomMemory {
  // source工人控制
  sourceList?: SourceList[];
  // creep数量控制
  creepControl?: boolean;
  creepList?: { [role in RoleConstant]: number };
  // 房间生产队列
  spawnList?: RoleConstant[];
  // 房间物流队列
  transportList?: TransportTask[];
}
// `global` extension samples
declare namespace NodeJS {
  interface Global {
    hasMount: boolean;
  }
}
