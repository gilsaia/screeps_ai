import { directionCheck } from '../config';
export const sourceApi = {
  /**
   * Alloc a source to creep
   * @param room
   */
  allocSource(room: Room): Id<Source> {
    if (!room.memory.sourceList) {
      findSource(room);
    }
    if (room.memory.sourceList[1] && room.memory.sourceList[1].harvester < room.memory.sourceList[0].harvester) {
      room.memory.sourceList[1].harvester++;
      return room.memory.sourceList[1].id;
    } else {
      room.memory.sourceList[0].harvester++;
      return room.memory.sourceList[0].id;
    }
  },
  /**
   * Check source container complete
   * @param room
   */
  checkSource(room: Room): boolean {
    if (!room.memory.sourceList) {
      findSource(room);
    }
    let complete = true;
    for (const source of room.memory.sourceList) {
      const pos = new RoomPosition(source.x, source.y, room.name);
      const structures = pos.lookFor(LOOK_STRUCTURES);
      let find = false;
      for (const structure of structures) {
        if (structure.structureType === STRUCTURE_CONTAINER) {
          find = true;
          break;
        }
      }
      if (!find) {
        complete = false;
        break;
      }
    }
    return complete;
  }
};

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
      const pos = new RoomPosition(sourcePos.x + dir[0], sourcePos.y + dir[1], room.name);
      let fee = 0;
      if (terrain.get(pos.x, pos.y) === TERRAIN_MASK_WALL) {
        continue;
      }
      /**
       * Calculate fee of this pos
       */
      for (const subDir of directionCheck) {
        const subPos = new RoomPosition(pos.x + subDir[0], pos.y + subDir[1], room.name);
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
      room.memory.sourceList.splice(0);
      console.log('Find Source Error %d', err);
      return err;
    }
    const sourceCondition: SourceCondition = {
      id: source.id,
      x: containerPos.x,
      y: containerPos.y,
      complete: false,
      harvester: 0
    };
    room.memory.sourceList.push(sourceCondition);
  }
  return OK;
}

/**
 * Room stage check
 * @param room
 */
export function roomStage(room: Room): number {
  if (!room.memory.roomStage) {
    room.memory.roomStage = 0;
  }
  return room.memory.roomStage;
}
export function updateRoomStage(room: Room): number {
  if (room.memory.roomStage < 1) {
    if (sourceApi.checkSource(room)) {
      room.memory.roomStage = 1;
    }
  }
  return room.memory.roomStage;
}
