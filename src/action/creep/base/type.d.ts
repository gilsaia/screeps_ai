type CreepBaseActionConfig = CreepGotoConfig | CreepUpgradeConfig | CreepBuildConfig;
type CreepBaseMemoryConfig = CreepMemoryGotoConfig & CreepMemoryUpgradeConfig & CreepMemoryBuildConfig;

interface CreepGotoConfig {
  usePathFinding: boolean;
}

interface CreepUpgradeConfig {
  boost: boolean;
}

interface CreepBuildConfig {
  dryTry: boolean;
}

interface CreepMemoryGotoConfig {
  target?: InRoomPosition;
  room?: string;
}

interface CreepMemoryUpgradeConfig {
  room?: string;
}

interface CreepMemoryBuildConfig {
  target?: InRoomPosition;
  room?: string;
  constructionSiteId?: Id<ConstructionSite>;
}
