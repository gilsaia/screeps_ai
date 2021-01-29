import { baseLayout, directionCheck } from '../config';
import { sourceApi } from './roomStage';

/**
 * Auto plan stage for each room
 */
export function autoPlan(): void {
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    if (!(room.controller && room.controller.my)) {
      continue;
    }
    if (!room.memory.sourceList) {
      findSource(room);
      room.memory.sourceCheck = false;
    }
    if (!room.memory.autoPlanStage) {
      room.memory.autoPlanStage = 0;
    }
    if (!room.memory.roadPlanStage) {
      room.memory.roadPlanStage = 0;
    }
    if (!room.memory.corePos) {
      room.memory.corePos = getCorePos(room);
      room.createFlag(room.memory.corePos.x, room.memory.corePos.y, 'Core_' + room.name, COLOR_ORANGE);
    }
    if (room.controller && room.memory.autoPlanStage < room.controller.level) {
      for (const layout of baseLayout[room.memory.autoPlanStage]) {
        for (const pos of layout.point) {
          if (pos === null) {
            // TODO null type means depend on room
          } else {
            const roomPos = new RoomPosition(room.memory.corePos.x + pos[0], room.memory.corePos.y + pos[1], room.name);
            roomPos.createCustomConstructionSite(layout.structureType);
          }
        }
      }
      room.memory.autoPlanStage++;
    }
    if (room.memory.roadPlanStage < 2 && room.controller && room.controller.level >= 2) {
      let pos = room.controller.pos;
      const terrain = room.getTerrain();
      for (const dir of directionCheck) {
        if (terrain.get(pos.x + dir[1][0], pos.y + dir[1][1]) !== TERRAIN_MASK_WALL) {
          pos = new RoomPosition(pos.x + dir[1][0], pos.y + dir[1][1], roomName);
          break;
        }
      }
      roadAutoPlan(pos, room);
      const sources = sourceApi.getAllSource(room);
      for (const source of sources) {
        pos = new RoomPosition(source.containerPosX, source.containerPosY, roomName);
        roadAutoPlan(pos, room);
      }
      room.memory.roadPlanStage = 2;
    }
  }
  return;
}

/**
 * Return core pos of room
 * @param room
 */
export function getCorePos(room: Room): Point {
  const mat: CostMatrix = new PathFinder.CostMatrix();
  // 根据地形填写代价函数
  for (let i = 0; i < 50; ++i) {
    for (let j = 0; j < 50; ++j) {
      const objList = room.lookAt(i, j);
      for (const obj of objList) {
        switch (obj.type) {
          case 'terrain':
            switch (obj.terrain) {
              case 'wall':
                mat.set(i, j, 1000);
                break;
              case 'swamp':
                mat.set(i, j, 5);
                break;
              case 'plain':
                mat.set(i, j, 1);
                break;
            }
            break;
          case 'source':
          case 'mineral':
            mat.set(i, j, 1000);
            break;
          case 'structure':
            switch ((obj.structure as Structure).structureType) {
              case 'controller':
                mat.set(i, j, 1000);
                break;
            }
        }
      }
    }
  }
  // 核心位置计算需要考虑距离控制器和矿的距离 能量由于后期实际通过link传输可以暂不考虑
  const mineral = room.find(FIND_MINERALS);
  bfsDistance(mat, { x: mineral[0].pos.x, y: mineral[0].pos.y });
  if (room.controller) {
    bfsDistance(mat, { x: room.controller.pos.x, y: room.controller.pos.y });
  }
  // 找出代价最小的核心位置
  let baseRes = 0;
  let corePos = { x: 8, y: 8 };
  let coreRes = 200000;
  // 遍历方块 确定基本个数
  for (let i = 2; i < 13; ++i) {
    for (let j = 2; j < 13; ++j) {
      baseRes += mat.get(i, j);
    }
  }
  for (let i = 8; i < 42; ++i) {
    for (let j = 2; j < 13; ++j) {
      baseRes -= mat.get(i - 6, j);
      baseRes += mat.get(i + 5, j);
    }
    let varRes = baseRes;
    for (let j = 8; j < 42; ++j) {
      for (let t = -5; t < 6; ++t) {
        varRes -= mat.get(i + t, j - 6);
        varRes += mat.get(i + t, j + 5);
      }
      if (varRes < coreRes) {
        coreRes = varRes;
        corePos = { x: i, y: j };
      }
    }
  }
  return corePos;
}
function bfsDistance(mat: CostMatrix, sourcePos: Point): void {
  const check = new Set<Point>();
  const quePos: Point[] = [];
  const queDis: number[] = [];
  check.add(sourcePos);
  quePos.push(sourcePos);
  queDis.push(0);
  while (quePos.length) {
    const pos = quePos.shift();
    const dis = queDis.shift();
    if (!pos || !dis) {
      continue;
    }
    mat.set(pos.x, pos.y, mat.get(pos.x, pos.y) + dis);
    for (const dir of directionCheck) {
      const bfsPos = { x: pos.x + dir[1][0], y: pos.y + dir[1][1] };
      if (check.has(bfsPos) || bfsPos.x < 0 || bfsPos.x >= 50 || bfsPos.y < 0 || bfsPos.y >= 50) {
        continue;
      }
      check.add(bfsPos);
      quePos.push(bfsPos);
      queDis.push(dis + 1);
    }
  }
  return;
}

/**
 * Build road from start to one of the core
 * @param start
 * @param room
 */
function roadAutoPlan(start: RoomPosition, room: Room): void {
  const mat = new PathFinder.CostMatrix();
  const goals = setLayoutMatrix(mat, room);
  const ret = PathFinder.search(start, goals, {
    roomCallback(roomName: string): boolean | CostMatrix {
      if (roomName !== room.name) {
        return false;
      }
      return mat;
    }
  });
  for (const pos of ret.path) {
    pos.createCustomConstructionSite(STRUCTURE_ROAD);
  }
  return;
}
/**
 * Set cost of layout
 * @param mat
 * @param room
 */
function setLayoutMatrix(mat: CostMatrix, room: Room): RoomPosition[] {
  const core = room.memory.corePos as Point;
  for (let i = -5; i < 6; ++i) {
    mat.set(core.x - 5, core.y + i, 255);
    mat.set(core.x + 5, core.y + i, 255);
    mat.set(core.x + i, core.y - 5, 255);
    mat.set(core.x + i, core.y + 5, 255);
  }
  mat.set(core.x - 5, core.y, 0);
  mat.set(core.x + 5, core.y, 0);
  mat.set(core.x, core.y - 5, 0);
  mat.set(core.x, core.y + 5, 0);
  return [
    new RoomPosition(core.x - 5, core.y, room.name),
    new RoomPosition(core.x + 5, core.y, room.name),
    new RoomPosition(core.x, core.y - 5, room.name),
    new RoomPosition(core.x, core.y + 5, room.name)
  ];
}
/**
 * Determine container of the source position
 * @param room
 */
function findSource(room: Room): ScreepsReturnCode {
  room.memory.sourceList = [];
  const terrain = new Room.Terrain(room.name);
  const sources = room.find(FIND_SOURCES);
  /**
   * For each source
   */
  for (const source of sources) {
    const sourcePos = source.pos;
    let containerPos = sourcePos;
    let containerFee = 0;
    /**
     * Each direction for the source
     */
    for (const dir of directionCheck) {
      const pos = new RoomPosition(sourcePos.x + dir[1][0], sourcePos.y + dir[1][1], room.name);
      let fee = 0;
      if (terrain.get(pos.x, pos.y) === TERRAIN_MASK_WALL) {
        continue;
      }
      /**
       * Calculate fee of this pos
       */
      for (const subDir of directionCheck) {
        const subPos = new RoomPosition(pos.x + subDir[1][0], pos.y + subDir[1][1], room.name);
        switch (terrain.get(subPos.x, subPos.y)) {
          case 0:
            fee += 5;
            break;
          case TERRAIN_MASK_WALL:
            fee += 0;
            break;
          case TERRAIN_MASK_SWAMP:
            fee += 1;
            break;
        }
      }
      /**
       * Change container pos
       */
      if (fee > containerFee) {
        containerFee = fee;
        containerPos = pos;
      }
    }
    const err = containerPos.createCustomConstructionSite(STRUCTURE_CONTAINER);
    // const err = containerPos.createConstructionSite(STRUCTURE_CONTAINER);
    if (err !== OK) {
      console.log('Find Source Error %d', err);
      return err;
    }
    const sourceCondition: SourceCondition = {
      sourceId: source.id,
      containerPosX: containerPos.x,
      containerPosY: containerPos.y,
      complete: false
    };
    room.memory.sourceList.push(sourceCondition);
  }
  return OK;
}
