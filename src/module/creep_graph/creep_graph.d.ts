interface CreepMemory {
  /**
   * creep所属的动作图
   */
  graph: CREEP_GRAPH;
  /**
   * creep当前状态
   */
  state: string;
}

/**
 * creep动作图包含不同类别
 */
type CREEP_GRAPH = CREEP_GRAPH_BASE | CREEP_GRAPH_SOURCE;
type CREEP_GRAPH_BASE = 'base';
type CREEP_GRAPH_SOURCE = 'source';

declare const CREEP_GRAPH_BASE: CREEP_GRAPH_BASE;
declare const CREEP_GRAPH_SOURCE: CREEP_GRAPH_SOURCE;
