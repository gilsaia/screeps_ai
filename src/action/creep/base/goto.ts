import { CompareRoomPositionWithInRoomPosition } from '../../../utils/utils';

/**
 * 移动 action
 * @param creep
 * @param config
 * @return {ACTION_CONTINUE|ACTION_FAIL|ACTION_WORKING}
 */
const goto = function (creep: Creep, config: CreepGotoConfig): ACTION_CODE {
  if (!creep.memory.config?.target) {
    return ACTION_FAIL;
  }
  if (CompareRoomPositionWithInRoomPosition(creep.pos, creep.memory.config.target)) {
    return ACTION_CONTINUE;
  }
  if (creep.memory.config?.room && creep.memory.config.room !== creep.room.name) {
    const position = new RoomPosition(
      creep.memory.config.target.x,
      creep.memory.config.target.y,
      creep.memory.config.room
    );
    creep.moveTo(position);
  } else {
    creep.moveTo(creep.memory.config.target.x, creep.memory.config.target.y);
  }
  return ACTION_WORKING;
};

export function GenerateCreepGotoAction(id: string, config: CreepGotoConfig, next: ActionEdge): Action<Creep> {
  return {
    id,
    config,
    act: goto,
    next
  };
}
