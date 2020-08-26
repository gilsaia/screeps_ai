// export const roleConfig = new Map<string, { body: BodyPartConstant[]; maxNumber: number }>([
//   ['harvester', { body: [WORK, WORK, CARRY, MOVE], maxNumber: 2 }],
//   ['upgrader', { body: [WORK, CARRY, MOVE], maxNumber: 1 }],
//   ['builder', { body: [WORK, CARRY, MOVE], maxNumber: 2 }]
// ]);
export const roleConfig = {
  harvester: { body: [WORK, WORK, CARRY, MOVE], maxNumber: 2 },
  upgrader: { body: [WORK, CARRY, MOVE], maxNumber: 1 },
  builder: { body: [WORK, CARRY, MOVE], maxNumber: 2 }
};
// source最多工人
export const SOURCE_MAX_WORKER = 4;
