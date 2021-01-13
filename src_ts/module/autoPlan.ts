import { directionCheck } from '../config';

/**
 * Auto plan stage for each room
 */
export function autoPlan(): void {
  for (const room in Game.rooms) {
    if (Game.rooms[room].energyCapacityAvailable === 0) {
      continue;
    }
    if (!Game.rooms[room].memory.sourceList) {
      findSource(Game.rooms[room]);
      Game.rooms[room].memory.sourceCheck = false;
    }
  }
  return;
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
    const err = containerPos.createConstructionSite(STRUCTURE_CONTAINER);
    if (err !== OK) {
      console.log('Find Source Error %d', err);
      return err;
    }
    const sourceCondition: SourceCondition = {
      sourceId: source.id,
      containerPosX: containerPos.x,
      containerPosY: containerPos.y,
      complete: false,
      harvester: 0
    };
    room.memory.sourceList.push(sourceCondition);
  }
  return OK;
}
