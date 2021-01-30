interface BodyConfig {
  body: BodyPartConstant;
  num: number;
}
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
type RoomTask = TransportTask | BuildTask | RepairTask;
/**
 * Permission
 * 0 only transfer
 * 1 transfer | repair
 * 2 transfer | repair | build
 */
type RoomTaskPermission = 0 | 1 | 2;
type TaskType = 'transport' | 'build' | 'repair';
type TransportTaskType = 'fillExtension' | 'fillTower';
interface TransportTask {
  resourceType: ResourceConstant;
  taskType: TaskType;
  transportType: TransportTaskType;
  worker: number;
}
interface BuildTask {
  id?: Id<ConstructionSite>;
  taskType: TaskType;
  point: Point;
  worker: number;
  check: boolean;
}
interface RepairTask {
  id: Id<Structure<StructureConstant>>;
  taskType: TaskType;
  worker: number;
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
   * Fill extension (Only use in transportTask fill extension/tower type)
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
  addTransportTask(type: ResourceConstant, transportType: TransportTaskType, worker: number): ScreepsReturnCode;
  takeTransportTask(): TransportTask | undefined;
  /**
   * BuildTask queue control logic
   */
  addBuildTask(point: Point, worker: number): ScreepsReturnCode;
  topBuildTask(): BuildTask | undefined;
  takeBuildTask(): BuildTask | undefined;
  addRepairTask(id: Id<Structure<StructureConstant>>, worker: number): ScreepsReturnCode;
  topRepairTask(): RepairTask | undefined;
  takeRepairTask(): RepairTask | undefined;
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
  fillExtensionTaskAlloc: boolean;
  fillTowerTaskAlloc: boolean;
  /**
   * Room build task
   */
  buildTaskList: BuildTask[];
  repairTaskList: RepairTask[];
  /**
   * Auto plan
   */
  corePos?: Point;
  autoPlanStage: number;
  roadPlanStage: number;
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
interface StatsMemory {
  gcl?: number;
  gclLevel?: number;
  gpl?: number;
  gplLevel?: number;
  cpu?: number;
  bucket?: number;
  credit?: number;
  rooms: {
    [roomName: string]: RoomStats;
  };
}
interface RoomStats {
  controllerRatio: number;
  controllerLevel: number;
}
interface Memory {
  stats: StatsMemory;
}
