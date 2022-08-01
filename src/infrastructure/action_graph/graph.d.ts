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
  config?: ActionConfig;
  param: TempEdgeParam;
}

// 临时边的配置选项
interface TempEdgeParam {
  onlyRemoveEdge?: boolean;
  priority?: number;
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
  /**
   * @deprecated 在方法中使用不符合语义 请直接在边中添加
   */
  onlyRemoveEdge?: boolean;
}

// 调度算法的实现 包含多种方法 *要求对外提供一致的方法* 由于screeps的游戏性质 不需要考虑并行问题
interface FindActionAlgorithmV2 {
  // 查找最优结果 根据结果返回对应的标号 要求在不改变的情况下与remove的删除情况一致
  FindIndex(name: string, edges: ActionEdgeV2[]): number;
  // 插入新的边 允许更改数组内部顺序
  Push(name: string, edges: ActionEdgeV2[], newEdge: ActionEdgeV2): void;
  // 删除当前的最优结果 要求此时与findIndex的结果保持一致
  Remove(name: string, edges: ActionEdgeV2[]): void;
}

/**
 * @description 动作图模型中边的基础接口
 */
interface ActionEdgeV2 {
  target: string;
  isTemp: boolean;
  count: number;
  priority: number;
}

/**
 * @description 对指定的Action按照不同的返回值确定下一步的参数
 */
type ActionReactionEdges = { [code in ACTION_CODE]?: ActionEdgeV2[] };

/**
 * @description 存储边的结构
 */
interface GraphEdgesV2 {
  [id: string]: ActionReactionEdges;
}

/**
 * @description 存储Action的结构
 */
interface GraphActionsV2<T> {
  [id: string]: ActionV2<T>;
}
