import { directionCheck } from '../../config';

export default function (sourcePos: RoomPosition): RoomPosition {
  let containerPos = sourcePos;
  let containerFee = 0;
  const terrain = new Room.Terrain(sourcePos.roomName);
  /**
   * Each direction for the source
   */
  for (const dir of directionCheck) {
    const pos = new RoomPosition(sourcePos.x + dir[1][0], sourcePos.y + dir[1][1], sourcePos.roomName);
    let fee = 0;
    if (terrain.get(pos.x, pos.y) === TERRAIN_MASK_WALL) {
      continue;
    }
    /**
     * Calculate fee of this pos
     */
    for (const subDir of directionCheck) {
      const subPos = new RoomPosition(pos.x + subDir[1][0], pos.y + subDir[1][1], sourcePos.roomName);
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
  // const err = containerPos.createCustomConstructionSite(STRUCTURE_CONTAINER);
  const err = containerPos.createConstructionSite(STRUCTURE_CONTAINER);
  if (err !== OK) {
    console.log('Find Source Error %d', err);
    return sourcePos;
  }
  return containerPos;
}
