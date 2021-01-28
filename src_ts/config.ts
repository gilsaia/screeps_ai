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
    [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
  ],
  worker: [
    [WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, MOVE],
    [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
  ],
  filler: [
    [WORK, CARRY, MOVE],
    [WORK, CARRY, CARRY, MOVE, MOVE],
    [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
  ]
};
/**
 * BaseCreep num for each room stage
 */
export const baseExceptCreepNum: { [role in BaseRoleConstant]: number }[] = [
  { harvester: 2, filler: 2, upgrader: 1, worker: 2 },
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
/**
 * Extension core pos
 */
export const baseLayout: BaseLayout[][] = [
  [{ structureType: STRUCTURE_SPAWN, point: [[-3, -2]] }],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [-4, -3],
        [-3, -4],
        [-5, -4],
        [-5, -3],
        [-5, -2]
      ]
    }
  ],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [-4, -5],
        [-3, -5],
        [-2, -5],
        [-1, -4],
        [-1, -3]
      ]
    },
    {
      structureType: STRUCTURE_TOWER,
      point: [[-2, -1]]
    },
    {
      structureType: STRUCTURE_ROAD,
      point: [
        [-1, -2],
        [-1, -1],
        [-2, -2],
        [-3, -3],
        [-2, -4],
        [-4, -2],
        [-4, -4]
      ]
    }
  ],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [-3, -1],
        [-4, -1],
        [1, -4],
        [1, -3],
        [3, -4],
        [4, -3],
        [2, -5],
        [3, -5],
        [4, -5],
        [5, -4]
      ]
    },
    { structureType: STRUCTURE_STORAGE, point: [[0, -1]] },
    {
      structureType: STRUCTURE_ROAD,
      point: [
        [0, -3],
        [1, -2],
        [2, -2],
        [3, -3],
        [2, -4],
        [4, -4]
      ]
    },
    {
      structureType: STRUCTURE_RAMPART,
      point: [
        [-3, -2],
        [0, -1],
        [-2, -1]
      ]
    }
  ],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [5, -3],
        [5, -2],
        [4, -1],
        [3, -1],
        [-3, 1],
        [-4, 1],
        [-3, 2],
        [-4, 3],
        [-3, 4],
        [-2, 3]
      ]
    },
    { structureType: STRUCTURE_TOWER, point: [[0, -2]] },
    { structureType: STRUCTURE_LINK, point: [[-1, 0], null] },
    {
      structureType: STRUCTURE_ROAD,
      point: [
        [4, -2],
        [-2, 0],
        [-1, 1],
        [-1, 2],
        [-2, 2],
        [-3, 3],
        [-4, 2],
        [0, 0]
      ]
    },
    { structureType: STRUCTURE_RAMPART, point: [[0, -2]] }
  ],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [-5, 2],
        [-5, 3],
        [-5, 4],
        [-4, 5],
        [-3, 5],
        [-2, 5],
        [-1, 3],
        [-1, 4],
        [3, 1],
        [4, 1]
      ]
    },
    {
      structureType: STRUCTURE_LAB,
      point: [
        [4, 3],
        [3, 4],
        [2, 3]
      ]
    },
    { structureType: STRUCTURE_TERMINAL, point: [[1, 0]] },
    { structureType: STRUCTURE_EXTRACTOR, point: [null] },
    { structureType: STRUCTURE_LINK, point: [null] },
    {
      structureType: STRUCTURE_ROAD,
      point: [
        [1, -1],
        [2, 0],
        [1, 1],
        [1, 2],
        [0, 3],
        [3, 0],
        [2, 2],
        [3, 3]
      ]
    },
    { structureType: STRUCTURE_RAMPART, point: [[1, 0]] }
  ],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [5, 1],
        [5, -1],
        [5, -5],
        [1, -5],
        [-5, -5],
        [-5, -1],
        [-5, 1],
        [-1, 5],
        [-1, -5],
        [1, 3]
      ]
    },
    { structureType: STRUCTURE_TOWER, point: [[2, -1]] },
    { structureType: STRUCTURE_SPAWN, point: [[-2, -3]] },
    { structureType: STRUCTURE_FACTORY, point: [[0, 1]] },
    {
      structureType: STRUCTURE_LAB,
      point: [
        [3, 2],
        [2, 4],
        [3, 5]
      ]
    },
    { structureType: STRUCTURE_LINK, point: [null] },
    {
      structureType: STRUCTURE_ROAD,
      point: [
        [4, 4],
        [-4, 4],
        [-2, 4],
        [4, 0],
        [-3, 0],
        [-4, 0]
      ]
    },
    {
      structureType: STRUCTURE_RAMPART,
      point: [
        [0, 1],
        [-2, -3],
        [2, -1]
      ]
    }
  ],
  [
    {
      structureType: STRUCTURE_EXTENSION,
      point: [
        [1, 4],
        [1, 5]
      ]
    },
    {
      structureType: STRUCTURE_TOWER,
      point: [
        [-2, 1],
        [0, 2],
        [2, 1]
      ]
    },
    {
      structureType: STRUCTURE_LAB,
      point: [
        [5, 2],
        [5, 3],
        [5, 4],
        [4, 5]
      ]
    },
    { structureType: STRUCTURE_SPAWN, point: [[2, -3]] },
    { structureType: STRUCTURE_OBSERVER, point: [[2, 5]] },
    { structureType: STRUCTURE_NUKER, point: [[-5, 5]] },
    { structureType: STRUCTURE_POWER_SPAWN, point: [[3, -2]] },
    {
      structureType: STRUCTURE_ROAD,
      point: [
        [4, 2],
        [0, 4],
        [0, -4]
      ]
    },
    {
      structureType: STRUCTURE_RAMPART,
      point: [
        [2, -3],
        [-5, 5],
        [-2, 1],
        [0, 2],
        [2, 1]
      ]
    }
  ]
];
