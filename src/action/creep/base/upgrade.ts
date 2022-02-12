/**
 * 升级控制器action
 * @param creep
 * @param config
 * @return {ACTION_WORKING|ACTION_FAIL|ACTION_EMPTY|ACTION_COMPLETE}
 */
const upgrade = function (creep: Creep, config: CreepUpgradeConfig): ACTION_CODE {
  if (!creep.memory.config) {
    return ACTION_FAIL;
  }
  if (!creep.room.controller || !creep.room.controller.my) {
    return ACTION_FAIL;
  }
  const code = creep.upgradeController(creep.room.controller);
  switch (code) {
    case ERR_NOT_ENOUGH_RESOURCES:
      return ACTION_EMPTY;
    case ERR_NOT_IN_RANGE:
      return ACTION_FAIL;
    case OK:
      return ACTION_WORKING;
    default:
      return ACTION_FAIL;
  }
};

export function GenerateUpgradeAction(id: string, config: CreepUpgradeConfig, next: ActionEdge): Action<Creep> {
  return {
    id,
    config,
    act: upgrade,
    next
  };
}
