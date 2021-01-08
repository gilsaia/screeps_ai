type RoleConstant = BaseRoleConstant;
type BaseRoleConstant = 'harvester' | 'upgrader' | 'worker';
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
 * Data different creep need
 */
type creepData = harvesterData | workerData;
interface harvesterData {
  room: string;
  sourceId: Id<Source>;
  sourcePosX: number;
  sourcePosY: number;
}
interface workerData {
  sourceId: Id<any>;
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
   * Room creep level control additional
   */
  creepMinLevel(): number;
  creepMaxLevel(): number;
}
interface SourceCondition {
  id: Id<Source>;
  x: number;
  y: number;
  complete: boolean;
  harvester: number;
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
  sourceList: SourceCondition[];
}
declare namespace NodeJS {
  interface Global {
    hasMount: boolean;
  }
}
