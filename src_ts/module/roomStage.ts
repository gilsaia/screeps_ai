import { directionCheck } from '../config';
export const sourceApi = {
  /**
   * Alloc a source to creep
   * @param room
   */
  allocSource(room: Room): SourceCondition {
    if (!room.memory.sourceList) {
      findSource(room);
    }
    if (room.memory.sourceList[1] && room.memory.sourceList[1].harvester < room.memory.sourceList[0].harvester) {
      room.memory.sourceList[1].harvester++;
      return room.memory.sourceList[1];
    } else {
      room.memory.sourceList[0].harvester++;
      return room.memory.sourceList[0];
    }
  },
  /**
   * Find source condition
   * @param room
   * @param id
   */
  searchSource(room: Room, id: Id<Source>): SourceCondition | undefined {
    if (!room.memory.sourceList) {
      findSource(room);
    }
    for (const source of room.memory.sourceList) {
      if (source.sourceId === id) {
        return source;
      }
    }
    return undefined;
  },
  /**
   * Check source container complete
   * @param room
   * @param deepCheck
   * @param id
   */
  checkSource(room: Room, deepCheck: boolean, id?: Id<Source>): boolean {
    if (!room.memory.sourceList) {
      findSource(room);
    }
    if (deepCheck) {
      let complete = true;
      for (const source of room.memory.sourceList) {
        /**
         * Check single source
         */
        if (id && source.sourceId !== id) {
          continue;
        }
        const pos = new RoomPosition(source.containerPosX, source.containerPosY, room.name);
        const structures = pos.lookFor(LOOK_STRUCTURES);
        let find = false;
        for (const structure of structures) {
          if (structure.structureType === STRUCTURE_CONTAINER) {
            source.containerId = structure.id;
            source.complete = true;
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
    } else {
      let complete = true;
      for (const source of room.memory.sourceList) {
        if (id && source.sourceId !== id) {
          continue;
        }
        complete = complete && source.complete;
      }
      return complete;
    }
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
      room.memory.sourceList.splice(0);
      console.log('Find Source Error %d', err);
      return err;
    }
    const constructionSite = containerPos.lookFor(LOOK_CONSTRUCTION_SITES);
    const sourceCondition: SourceCondition = {
      sourceId: source.id,
      containerId: constructionSite[0].id,
      containerPosX: containerPos.x,
      containerPosY: containerPos.y,
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
    if (sourceApi.checkSource(room, true)) {
      room.memory.roomStage = 1;
    }
  }
  return room.memory.roomStage;
}
