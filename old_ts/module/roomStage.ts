import _ from 'lodash';

export const sourceApi = {
  /**
   * Alloc a source to creep
   * @param room
   */
  allocSource(room: Room): SourceCondition {
    if (!room.memory.sourceCheck) {
      findContainer(room);
    }
    room.memory.sourceList.reverse();
    return room.memory.sourceList[0];
  },
  /**
   * Find source condition
   * @param room
   * @param id
   */
  searchSource(room: Room, id: Id<Source>): SourceCondition | undefined {
    if (!room.memory.sourceCheck) {
      findContainer(room);
    }
    for (const source of room.memory.sourceList) {
      if (source.sourceId === id) {
        return source;
      }
    }
    return undefined;
  },
  /**
   * Give position to a creep to source
   * @param room
   */
  getSource(room: Room): Id<Source | Structure<StructureConstant>> {
    if (!room.memory.sourceCheck) {
      findContainer(room);
    }
    let res;
    // TODO 物流系统上线后变为从物流系统获取
    const index = _.random(0, room.memory.sourceList.length - 1);
    if (room.memory.sourceList[index].complete) {
      res = room.memory.sourceList[index].containerId as Id<Structure<StructureConstant>>;
    } else {
      res = room.memory.sourceList[index].sourceId;
    }
    // room.memory.sourceList.reverse();
    return res;
  },
  /**
   * Get all source
   * @param room
   */
  getAllSource(room: Room): SourceCondition[] {
    if (!room.memory.sourceCheck) {
      findContainer(room);
    }
    return room.memory.sourceList;
  },
  /**
   * Check source container complete
   * @param room
   * @param deepCheck
   * @param id
   */
  checkSource(room: Room, deepCheck: boolean, id?: Id<Source>): boolean {
    if (!room.memory.sourceCheck) {
      findContainer(room);
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
 * Find container or constructionSite of the source position
 * @param room
 */
function findContainer(room: Room): ScreepsReturnCode {
  for (const sourceCondition of room.memory.sourceList) {
    if (!sourceCondition.containerId) {
      const pos = new RoomPosition(sourceCondition.containerPosX, sourceCondition.containerPosY, room.name);
      const constructionSiteRes = pos.lookFor(LOOK_CONSTRUCTION_SITES);
      if (constructionSiteRes.length) {
        sourceCondition.containerId = constructionSiteRes[0].id;
      } else {
        const structureRes = pos.lookFor(LOOK_STRUCTURES);
        for (const structure of structureRes) {
          if (structure.structureType === STRUCTURE_CONTAINER) {
            sourceCondition.containerId = structure.id;
            break;
          }
        }
      }
    }
  }
  room.memory.sourceCheck = true;
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
