type CreepActionConfig = CreepBaseActionConfig;
type CreepMemoryConfig = CreepBaseMemoryConfig;

interface CreepMemory {
  /**
   * creep当前action及task层次配置
   */
  config?: CreepMemoryConfig;

  /**
   * creep死亡回调任务
   * @param config
   */
  deathTask?(config: CreepMemoryConfig): void;
}
