/**
 * Energy each level creep need
 */
export const energyCreepLevel = [200, 300, 550, 800, 1300, 2300, 5600, 10000, 20000];
/**
 * Creep Body each role
 */
export const creepBody: { [role in RoleConstant]: BodyPartConstant[][] } = {
  harvester: [
    [WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
  ],
  upgrader: [
    [WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
  ],
  worker: [
    [WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
  ],
  filler: [
    [CARRY, CARRY, MOVE],
    [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
  ]
};
/**
 * BaseCreep num for each room stage
 */
export const baseExceptCreepNum: { [role in BaseRoleConstant]: number }[] = [
  { harvester: 2, filler: 0, upgrader: 2, worker: 0 },
  { harvester: 2, filler: 2, upgrader: 2, worker: 2 }
];
/**
 * Init BaseCreep num for init
 */
export const baseCreepNumInit: { [role in BaseRoleConstant]: number } = {
  harvester: 0,
  upgrader: 0,
  worker: 0,
  filler: 0
};
/**
 * Creep control check interval
 */
export const creepControlInterval = 10;
/**
 * 8 Direction check
 */
export const directionCheck = new Map<DirectionConstant, number[]>([
  [1, [0, -1]],
  [2, [1, -1]],
  [3, [1, 0]],
  [4, [1, 1]],
  [5, [0, 1]],
  [6, [-1, 1]],
  [7, [-1, 0]],
  [8, [-1, -1]]
]);
/**
 * Transport task type map to number
 */
export const transportTaskTypeMap: { [type in TransportTaskType]: number } = {
  fillExtension: 0
};
