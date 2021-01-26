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
interface Point {
  x: number;
  y: number;
}

/**
 * Different task type
 */
type RoomTask = TransportTask | BuildTask;
/**
 * Permission
 * 0 only transfer
 * 1 add work | repair
 */
type RoomTaskPermission = 0 | 1;
type TaskType = 'transport' | 'build' | 'repair';
type TransportTaskType = 'fillExtension';
interface TransportTask {
  resourceType: ResourceConstant;
  taskType: TaskType;
  transportType: TransportTaskType;
}
interface BuildTask {
  id?: Id<ConstructionSite>;
  taskType: TaskType;
  point: Point;
  worker: number;
  check: boolean;
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
  task?: RoomTask;
}
interface fillerData {
  sourceId: Id<Source | Structure<StructureConstant>>;
  task?: RoomTask;
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
  /**
   * Fill extension (Only use in transportTask fill extension type)
   */
  fillId?: Id<Structure<StructureConstant>>;
}
interface Structure {
  work?(): void;
}
interface SourceCondition {
  sourceId: Id<Source>;
  containerId?: Id<ConstructionSite | Structure<StructureConstant>>;
  containerPosX: number;
  containerPosY: number;
  complete: boolean;
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
  addTransportTask(type: ResourceConstant, transportType: TransportTaskType): ScreepsReturnCode;
  takeTransportTask(): TransportTask | undefined;
  finishTransportTask(task: TransportTask): ScreepsReturnCode;

  /**
   * BuildTask queue control logic
   */
  addBuildTask(point: Point, worker: number): ScreepsReturnCode;
  topBuildTask(): BuildTask | undefined;
  takeBuildTask(): BuildTask | undefined;

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
interface RoomPosition {
  createCustomConstructionSite(type: BuildableStructureConstant): ScreepsReturnCode;
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
  transportTaskSet: number[];
  /**
   * Room build task
   */
  buildTaskList: BuildTask[];
  /**
   * Auto plan
   */
  corePos?: Point;
  autoPlanStage: number;
}

/**
 * Layout information
 */
interface BaseLayout {
  structureType: BuildableStructureConstant;
  point: ([number, number] | null)[];
}
declare namespace NodeJS {
  interface Global {
    hasMount: boolean;
  }
}
/**
 * 包含任意键值对的对象
 */
interface AnyObject {
  [key: string]: any;
}
