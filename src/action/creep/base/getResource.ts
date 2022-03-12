/**
 * 获取资源 action
 * @param creep
 * @param config
 * @return {ACTION_FAIL|ACTION_CONTINUE|ACTION_WORKING|ACTION_EMPTY}
 */
const getResource = function (creep: Creep, config: CreepGetResourceConfig): ACTION_CODE {
  if (
    !creep.memory.config ||
    !creep.memory.config.warehouseTarget ||
    !creep.memory.config.warehouseId ||
    !creep.memory.config.warehouseType ||
    !creep.memory.config.resourceType
  ) {
    return ACTION_FAIL;
  }
  // 对于需要携带的情况 若已经带满了则直接跳过到下一状态
  if (config.carry) {
    if (creep.store.getFreeCapacity() === 0) {
      return ACTION_CONTINUE;
    }
  }
  let code: ScreepsReturnCode;
  const warehouse = Game.getObjectById(creep.memory.config.warehouseId);
  if (!warehouse) {
    return ACTION_FAIL;
  }
  switch (creep.memory.config.warehouseType) {
    case 'source':
    case 'mineral':
    case 'deposit':
      code = creep.harvest(warehouse as Source | Mineral | Deposit);
      break;
    default:
      code = creep.withdraw(warehouse as Structure | Tombstone | Ruin, creep.memory.config.resourceType);
  }
  switch (code) {
    case OK:
    case ERR_TIRED:
      return ACTION_WORKING;
    case ERR_FULL:
      return ACTION_CONTINUE;
    case ERR_NOT_ENOUGH_RESOURCES:
      return ACTION_EMPTY;
    default:
      return ACTION_FAIL;
  }
};

export function GenerateCreepGetResourceAction(
  id: string,
  config: CreepGetResourceConfig,
  next: ActionEdge
): Action<Creep> {
  return {
    id,
    config,
    act: getResource,
    next
  };
}
