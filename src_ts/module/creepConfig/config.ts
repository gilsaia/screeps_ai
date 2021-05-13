export const BaseCreepRolePart: { [role in BaseCreepRole]: creepBodyConfig[][] } = {
  harvester: [
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 2 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 4 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 2 }
    ],
    [
      { body: WORK, num: 6 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 3 }
    ]
  ],
  upgrader: [
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 2 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 2 },
      { body: CARRY, num: 3 },
      { body: MOVE, num: 3 }
    ],
    [
      { body: WORK, num: 4 },
      { body: CARRY, num: 4 },
      { body: MOVE, num: 4 }
    ]
  ],
  worker: [
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 2 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 2 },
      { body: CARRY, num: 3 },
      { body: MOVE, num: 3 }
    ],
    [
      { body: WORK, num: 4 },
      { body: CARRY, num: 4 },
      { body: MOVE, num: 4 }
    ]
  ],
  transfer: [
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 1 },
      { body: MOVE, num: 1 }
    ],
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 2 },
      { body: MOVE, num: 2 }
    ],
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 6 },
      { body: MOVE, num: 3 }
    ],
    [
      { body: WORK, num: 1 },
      { body: CARRY, num: 8 },
      { body: MOVE, num: 4 }
    ]
  ]
};
export const BaseCreepNumberLimit: { [role in BaseCreepRole]: number[] } = {
  harvester: [2, 2, 2],
  upgrader: [1, 1, 2],
  transfer: [1, 2, 2],
  worker: [0, 1, 2]
};
