export const autoPlanBaseList: { [stage: number]: AutoPlanItem[] } = {
  1: [{ StructureType: STRUCTURE_SPAWN, point: [[-3, -2]] }],
  2: [
    {
      StructureType: STRUCTURE_EXTENSION,
      point: [
        [-4, -3],
        [-3, -4],
        [-5, -4],
        [-5, -3],
        [-5, -2]
      ]
    }
  ],
  3: [
    {
      StructureType: STRUCTURE_EXTENSION,
      point: [
        [-4, -5],
        [-3, -5],
        [-2, -5],
        [-1, -4],
        [-1, -3]
      ]
    },
    {
      StructureType: STRUCTURE_TOWER,
      point: [[-2, -1]]
    },
    {
      StructureType: STRUCTURE_ROAD,
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
  4: [
    {
      StructureType: STRUCTURE_EXTENSION,
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
    { StructureType: STRUCTURE_STORAGE, point: [[0, -1]] },
    {
      StructureType: STRUCTURE_ROAD,
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
      StructureType: STRUCTURE_RAMPART,
      point: [
        [-3, -2],
        [0, -1],
        [-2, -1]
      ]
    }
  ],
  5: [
    {
      StructureType: STRUCTURE_EXTENSION,
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
    { StructureType: STRUCTURE_TOWER, point: [[0, -2]] },
    { StructureType: STRUCTURE_LINK, point: [[-1, 0], null] },
    {
      StructureType: STRUCTURE_ROAD,
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
    { StructureType: STRUCTURE_RAMPART, point: [[0, -2]] }
  ],
  6: [
    {
      StructureType: STRUCTURE_EXTENSION,
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
      StructureType: STRUCTURE_LAB,
      point: [
        [4, 3],
        [3, 4],
        [2, 3]
      ]
    },
    { StructureType: STRUCTURE_TERMINAL, point: [[1, 0]] },
    { StructureType: STRUCTURE_EXTRACTOR, point: [null] },
    { StructureType: STRUCTURE_LINK, point: [null] },
    {
      StructureType: STRUCTURE_ROAD,
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
    { StructureType: STRUCTURE_RAMPART, point: [[1, 0]] }
  ],
  7: [
    {
      StructureType: STRUCTURE_EXTENSION,
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
    { StructureType: STRUCTURE_TOWER, point: [[2, -1]] },
    { StructureType: STRUCTURE_SPAWN, point: [[-2, -3]] },
    { StructureType: STRUCTURE_FACTORY, point: [[0, 1]] },
    {
      StructureType: STRUCTURE_LAB,
      point: [
        [3, 2],
        [2, 4],
        [3, 5]
      ]
    },
    { StructureType: STRUCTURE_LINK, point: [null] },
    {
      StructureType: STRUCTURE_ROAD,
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
      StructureType: STRUCTURE_RAMPART,
      point: [
        [0, 1],
        [-2, -3],
        [2, -1]
      ]
    }
  ],
  8: [
    {
      StructureType: STRUCTURE_EXTENSION,
      point: [
        [1, 4],
        [1, 5]
      ]
    },
    {
      StructureType: STRUCTURE_TOWER,
      point: [
        [-2, 1],
        [0, 2],
        [2, 1]
      ]
    },
    {
      StructureType: STRUCTURE_LAB,
      point: [
        [5, 2],
        [5, 3],
        [5, 4],
        [4, 5]
      ]
    },
    { StructureType: STRUCTURE_SPAWN, point: [[2, -3]] },
    { StructureType: STRUCTURE_OBSERVER, point: [[2, 5]] },
    { StructureType: STRUCTURE_NUKER, point: [[-5, 5]] },
    { StructureType: STRUCTURE_POWER_SPAWN, point: [[3, -2]] },
    {
      StructureType: STRUCTURE_ROAD,
      point: [
        [4, 2],
        [0, 4],
        [0, -4]
      ]
    },
    {
      StructureType: STRUCTURE_RAMPART,
      point: [
        [2, -3],
        [-5, 5],
        [-2, 1],
        [0, 2],
        [2, 1]
      ]
    }
  ]
};
