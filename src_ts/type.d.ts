type RoleConstant = BaseRoleConstant;
type BaseRoleConstant = 'harvester' | 'upgrader' | 'worker' | 'filler';
/**
 * Task for Spawn to choose which creep to spawn
 */
interface CreepTask {
  /**
   * Creep role
   */
  role: RoleConstant;
  /**
   * Creep min level
   */
  minLevel: number;
  /**
   * Creep max level
   */
  maxLevel: number;
  /**
   * This means now there is no creep so the spawn will try to spawn creep as soon as possible
   */
  initial: boolean;
}

/**
 * Function creep use to act
 */
interface CreepConfig {
  /**
   * Creep control counter
   * @param creep
   */
  count?: (creep: Creep, interval: number) => void;
  /**
   * Basic action
   * @param creep
   */
  source: (creep: Creep) => boolean;
  /**
   * Optional target action when working is true
   * @param creep
   */
  target?: (creep: Creep) => boolean;
  /**
   * Change working condition
   * @param creep
   */
  sourceSwitch?: (creep: Creep) => boolean;
  targetSwitch?: (creep: Creep) => boolean;
}

/**
 * Different task type
 */
declare enum TaskType {
  transport,
  build,
  repair
}
type RoomTask = TransportTask;
interface TransportTask {
  resourceType: ResourceConstant;
  taskType: TaskType;
  id: Id<Structure<StructureConstant>>;
}
/**
 * Data different creep need
 */
type creepData = baseCreepData;
type baseCreepData = harvesterData | workerData | upgraderData | fillerData;
interface harvesterData {
  sourceId: Id<Source>;
  sourcePosX: number;
  sourcePosY: number;
  containerId: Id<ConstructionSite | Structure<StructureConstant>>;
  containerPosX: number;
  containerPosY: number;
  complete: boolean;
}
interface upgraderData {
  sourceId: Id<Source | Structure<StructureConstant>>;
}
interface workerData {
  sourceId: Id<Source | Structure<StructureConstant>>;
}
interface fillerData {
  sourceId: Id<Source | Structure<StructureConstant>>;
  task?: TransportTask;
}
interface Creep {
  work(): void;
}
interface CreepMemory {
  /**
   * Creep Role
   */
  role: RoleConstant;
  /**
   * Creep condition
   */
  working: boolean;
  room: string;
  data?: creepData;
}
interface Structure {
  work?(): void;
}
interface Room {
  /**
   * CreepTask queue control logic
   */
  addCreepTask(role: RoleConstant, initial: boolean, minLevel: number, maxLevel: number): ScreepsReturnCode;
  topCreepTask(): CreepTask | undefined;
  takeCreepTask(): CreepTask | undefined;

  /**
   * TransportTask queue control logic
   */
  addTransportTask(type: ResourceConstant, id: Id<Structure<StructureConstant>>): ScreepsReturnCode;
  takeTransportTask(): TransportTask | undefined;
  finishTransportTask(task: TransportTask): ScreepsReturnCode;
  /**
   * Room creep level control additional
   */
  creepMinLevel(): number;
  creepMaxLevel(): number;

  /**
   * Backup Control function(not use at normal)
   */
  baseCreepListCorrect(): void;
}
interface SourceCondition {
  sourceId: Id<Source>;
  containerId?: Id<ConstructionSite | Structure<StructureConstant>>;
  containerPosX: number;
  containerPosY: number;
  complete: boolean;
}
interface RoomMemory {
  /**
   * Control Creep Number List
   */
  baseCreepList: { [role in BaseRoleConstant]: number };
  baseCreepExceptList: { [role in BaseRoleConstant]: number };
  /**
   * Room stage in creep control
   */
  roomStage: number;
  /**
   * ToSpawn-Creep in this room
   */
  creepTaskList: CreepTask[];
  /**
   * Room source condition
   */
  sourceCheck: boolean;
  sourceList: SourceCondition[];
  /**
   * Room transport task
   */
  transportTaskList: TransportTask[];
  transportTaskSet: Set<Id<Structure<StructureConstant>>>;
}
declare namespace NodeJS {
  interface Global {
    hasMount: boolean;
  }
}
