// 调度算法的实现 包含多种方法 *要求对外提供一致的方法* 由于screeps的游戏性质 不需要考虑并行问题
interface FindActionAlgorithm {
  // 查找最优结果 根据结果返回对应的标号 要求在不改变的情况下与remove的删除情况一致
  FindIndex(actions: TempEdgeCondition[]): number;
  // 插入新的临时边 允许更改数组内部顺序
  Push(actions: TempEdgeCondition[], newAction: TempEdgeCondition): void;
  // 删除当前的最优结果 要求此时与findIndex的结果保持一致
  Remove(actions: TempEdgeCondition[]): void;
}

// 临时边指向的Action以及应被应用几次 以及可选的配置情况
interface TempEdgeCondition {
  id: string;
  count: number;
  priority?: number;
  config?: ActionConfig;
}

// 临时边数组 根据不同的ActionCode对应不同的反应
interface tempEdge {
  [code: number]: TempEdgeCondition[];
}

// 在对象中存储的索引 对于Action的id建立映射
interface graphEdges {
  [id: string]: tempEdge;
}

// 在对象中存储的当前所有Action
interface actions<T> {
  [id: string]: Action<T>;
}

// 对于实际调用响应函数调整参数
interface ActionGraphGetResponseParam {
  onlyRemoveEdge?: boolean;
}
