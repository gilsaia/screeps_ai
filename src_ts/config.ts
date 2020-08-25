export const characterConfig = new Map<string, { body: BodyPartConstant[]; maxNumber: number }>([
  ['harvester', { body: [WORK, WORK, CARRY, MOVE], maxNumber: 2 }],
  ['upgrader', { body: [WORK, CARRY, MOVE], maxNumber: 1 }],
  ['builder', { body: [WORK, CARRY, MOVE], maxNumber: 2 }]
]);
