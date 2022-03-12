type CreepBaseActionConfig = CreepGotoConfig | CreepUpgradeConfig | CreepBuildConfig | CreepGetResourceConfig;
type CreepBaseMemoryConfig = CreepMemoryGotoConfig &
  CreepMemoryUpgradeConfig &
  CreepMemoryBuildConfig &
  CreepMemoryGetResourceConfig;

interface CreepGotoConfig {
  usePathFinding: boolean;
}

interface CreepUpgradeConfig {
  boost: boolean;
}

interface CreepBuildConfig {
  dryTry: boolean;
}

interface CreepGetResourceConfig {
  carry: boolean;
}

interface CreepMemoryGotoConfig {
  target?: InRoomPosition;
  room?: string;
}

interface CreepMemoryUpgradeConfig {
  room?: string;
}

interface CreepMemoryBuildConfig {
  buildTarget?: InRoomPosition;
  room?: string;
  constructionSiteId?: Id<ConstructionSite>;
}

interface CreepMemoryGetResourceConfig {
  warehouseTarget?: InRoomPosition;
  warehouseId?: Id<Structure | Tombstone | Ruin | Source | Mineral | Deposit>;
  warehouseType?:
    | STRUCTURE_CONTAINER
    | STRUCTURE_LINK
    | STRUCTURE_STORAGE
    | STRUCTURE_LAB
    | STRUCTURE_FACTORY
    | LOOK_TOMBSTONES
    | LOOK_RUINS
    | LOOK_SOURCES
    | LOOK_MINERALS
    | LOOK_DEPOSITS;
  resourceType?: ResourceConstant;
}
