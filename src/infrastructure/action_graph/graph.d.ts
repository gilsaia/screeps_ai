// 衡量对于不同的临时边优先选择顺序的算法 返回对应的index
interface FindActionAlgorithm {
  (actions: TempEdgeCondition[]): number;
}

// 临时边指向的Action以及应被应用几次 以及可选的配置情况
interface TempEdgeCondition {
  id: string;
  count: number;
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
