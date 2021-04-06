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
