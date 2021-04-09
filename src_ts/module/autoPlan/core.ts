import { directionCheck } from '../../config';

export function GetCorePos(room: Room): ScreepsPosition {
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
  // 逐行右移
  for (let i = 8; i < 42; ++i) {
    for (let j = 2; j < 13; ++j) {
      baseRes -= mat.get(i - 6, j);
      baseRes += mat.get(i + 5, j);
    }
    // 下面下移部分会导致下次原始信息丢失 因此用新变量存
    let varRes = baseRes;
    // 逐行下移
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
function bfsDistance(mat: CostMatrix, sourcePos: ScreepsPosition): void {
  const check = new Set<ScreepsPosition>();
  const quePos: ScreepsPosition[] = [];
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
