// export const roleConfig = new Map<RoleConstant, { body: BodyPartConstant[]; maxNumber: number }>([
//   ['harvester', { body: [WORK, WORK, CARRY, MOVE], maxNumber: 2 }],
//   ['upgrader', { body: [WORK, CARRY, MOVE], maxNumber: 2 }],
//   ['builder', { body: [WORK, CARRY, MOVE], maxNumber: 1 }]
// ]);
export const roleConfig = {
  harvester: { body: [WORK, WORK, CARRY, MOVE] },
  upgrader: { body: [WORK, CARRY, MOVE] },
  builder: { body: [WORK, CARRY, MOVE] }
};
export const numberConfig: { [role in RoleConstant]: number } = {
  harvester: 2,
  upgrader: 2,
  builder: 1
};
// source最多工人
export const SOURCE_MAX_WORKER = 4;
