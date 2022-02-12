import { AllDirections } from '../../../utils/utils';

/**
 * 建造 action
 * @param creep
 * @param config
 * @return {ACTION_FAIL|ACTION_WORKING|ACTION_EMPTY|ACTION_CONTINUE}
 */
const build = function (creep: Creep, config: CreepBuildConfig): ACTION_CODE {
  if (!creep.memory.config || !creep.memory.config.target || !creep.memory.config.constructionSiteId) {
    return ACTION_FAIL;
  }
  if (creep.memory.config.target.x === creep.pos.x && creep.memory.config.target.y === creep.pos.y) {
    // TODO: cache terrain
    const terrain = creep.room.getTerrain();
    for (const dir of AllDirections) {
      if (terrain.get(creep.pos.x + dir.dx, creep.pos.y + dir.dy) === 0) {
        creep.move(dir.dir);
        break;
      }
    }
  }
  const site = Game.getObjectById(creep.memory.config.constructionSiteId);
  if (!site) {
    return ACTION_CONTINUE;
  }
  const code = creep.build(site);
  switch (code) {
    case OK:
    case ERR_INVALID_TARGET:
      return ACTION_WORKING;
    case ERR_NOT_ENOUGH_RESOURCES:
      return ACTION_EMPTY;
    default:
      return ACTION_FAIL;
  }
};

export function GenerateCreepBuildAction(id: string, config: CreepBuildConfig, next: ActionEdge): Action<Creep> {
  return {
    id,
    config,
    act: build,
    next
  };
}
