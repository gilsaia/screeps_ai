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
interface Creep {
  work(): void;
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
  creepMinLevel(): number;
  creepMaxLevel(): number;
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
}
declare namespace NodeJS {
  interface Global {
    hasMount: boolean;
  }
}
