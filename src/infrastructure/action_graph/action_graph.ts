// 最简单的调度方法 按照简单栈的方式操作
/**
 * @deprecated
 */
export const SimpleFindAction: FindActionAlgorithm = {
  FindIndex(actions: TempEdgeCondition[]): number {
    return actions.length - 1;
  },
  Push(actions: TempEdgeCondition[], newAction: TempEdgeCondition) {
    actions.push(newAction);
  },
  Remove(actions: TempEdgeCondition[]) {
    actions.pop();
  }
};
/**
 * @description 最简单的调度方法 以简单栈的方式操作
 */
export const SimpleFindActionAlgorithmV2: FindActionAlgorithmV2 = {
  FindIndex(edges: ActionEdgeV2[]): number {
    return edges.length - 1;
  },
  Push(edges: ActionEdgeV2[], newEdge: ActionEdgeV2) {
    edges.push(newEdge);
  },
  Remove(edges: ActionEdgeV2[]) {
    edges.pop();
  }
};
// 动作图的基类 提供各项基础功能
/**
 * @deprecated
 */
export class ActionGraph<T> {
  protected findAlgorithm: FindActionAlgorithm;
  private readonly actions: actions<T>;
  private readonly usedActions: Set<string>;
  private readonly edges: graphEdges;
  private readonly default: Action<T>;
  private readonly defaultId: string;
  // 检查当前的临时边对应结构是否创建
  private checkTempEdge(source: string, code: ACTION_CODE): void {
    if (this.edges[source] === undefined) {
      this.edges[source] = {};
    }
    if (this.edges[source][code] === undefined) {
      this.edges[source][code] = [];
    }
  }
  public constructor(defaultAction: Action<T>, findAlgorithm: FindActionAlgorithm) {
    this.default = defaultAction;
    this.defaultId = defaultAction.id;
    this.findAlgorithm = findAlgorithm;
    this.edges = {};
    this.actions = {};
    this.usedActions = new Set<string>();
    this.actions[defaultAction.id] = defaultAction;
  }
  // 获取当前的默认Action
  public GetDefaultAction(): Action<T> {
    return this.default;
  }
  // 根据id获取Action
  public GetAction(id: string): Action<T> | undefined {
    return this.actions[id];
  }
  // 根据id查询是否存在Action
  public ExistAction(id: string): boolean {
    return this.actions[id] !== undefined;
  }
  // 注册Action
  public RegisterAction(action: Action<T>): void {
    if (this.actions[action.id] !== undefined) {
      return;
    }
    this.actions[action.id] = action;
  }
  // 注册临时边
  public RegisterTempEdge(source: string, code: ACTION_CODE, targetCondition: TempEdgeCondition): void {
    this.checkTempEdge(source, code);
    this.findAlgorithm.Push(this.edges[source][code], targetCondition);
  }
  // 若当前Action未注册则注册Action和临时边 否则不进行操作 注意 该记录只在该方法内生效 但全过程保存一致 记录可删除
  public RegisterActionWithTempEdgeOnce(
    action: Action<T>,
    source: string,
    code: ACTION_CODE,
    targetCondition: TempEdgeCondition
  ): void {
    if (this.usedActions.has(action.id)) {
      return;
    }
    this.actions[action.id] = action;
    this.usedActions.add(action.id);
    this.checkTempEdge(source, code);
    this.findAlgorithm.Push(this.edges[source][code], targetCondition);
  }
  public RemoveUsedHistory(id: string): void {
    this.usedActions.delete(id);
  }
  // 删除指定Action和它关联的所有临时边
  public RemoveAction(id: string): void {
    if (id === this.defaultId) {
      console.error('Try to remove default action!');
      return;
    }
    delete this.actions[id];
    delete this.edges[id];
  }
  // 删除指定临时边以及临时边指向的Action
  public RemoveTempEdgeWithAction(source: string, code: ACTION_CODE): void {
    if (this.edges[source] === undefined || this.edges[source][code] === undefined) {
      return;
    }
    const index = this.findAlgorithm.FindIndex(this.edges[source][code]);
    const target = this.edges[source][code][index];
    if (target.id === this.defaultId) {
      console.error('Try to remove default action!');
      return;
    }
    this.findAlgorithm.Remove(this.edges[source][code]);
    delete this.actions[target.id];
    delete this.edges[target.id];
  }
  // 删除指定临时边
  public RemoveTempEdge(source: string, code: ACTION_CODE): void {
    if (this.edges[source] === undefined || this.edges[source][code] === undefined) {
      return;
    }
    this.findAlgorithm.Remove(this.edges[source][code]);
  }
  // 根据Action获取对应响应状态 若无记录状态则返回默认状态
  private getOriginResponse(source: string, code: ACTION_CODE): string {
    if (this.actions[source].next[code] === undefined) {
      console.warn('Not find usable action,now action is %s,code is %d', source, code);
      return this.GetDefaultAction().id;
    }
    return this.actions[source].next[code];
  }
  // 对外暴露的响应接口 会首先尝试获取临时边 不存在的情况下获取Action本身状态
  // 注意！务必谨慎使用 可能导致删除连带状态 对于长链的task请仔细考虑
  public GetResponse(source: string, code: ACTION_CODE, opt?: ActionGraphGetResponseParam): string {
    if (
      this.edges[source] === undefined ||
      this.edges[source][code] === undefined ||
      this.edges[source][code].length < 1
    ) {
      return this.getOriginResponse(source, code);
    }
    const tempConditions = this.edges[source][code];
    while (tempConditions.length) {
      const index = this.findAlgorithm.FindIndex(tempConditions);
      if (tempConditions[index].count === 0) {
        if (tempConditions[index].param.onlyRemoveEdge) {
          this.RemoveTempEdge(source, code);
        } else {
          this.RemoveTempEdgeWithAction(source, code);
        }
        continue;
      }
      const target = tempConditions[index].id;
      --tempConditions[index].count;
      return target;
    }
    return this.getOriginResponse(source, code);
  }
}

export class ActionGraphV2<T> {
  protected findAlgorithm: FindActionAlgorithmV2;
  private readonly actions: GraphActionsV2<T>;
  private readonly edges: GraphEdgesV2;
  private readonly usedActions: Set<string>;
  private defaultAction: ActionV2<T>;
  public constructor(findAlgorithm: FindActionAlgorithmV2, defaultAction: ActionV2<T>) {
    this.findAlgorithm = findAlgorithm;
    this.actions = {};
    this.edges = {};
    this.usedActions = new Set<string>();
    this.defaultAction = defaultAction;
  }
  public GetDefaultAction(): ActionV2<T> {
    return this.defaultAction;
  }
  public SetDefaultAction(action: ActionV2<T>): void {
    this.defaultAction = action;
  }
  public GetFindAlgorithm(): FindActionAlgorithmV2 {
    return this.findAlgorithm;
  }
  public AddAction(action: ActionV2<T>): void {
    this.actions[action.id] = action;
    this.usedActions.add(action.id);
  }
  // 如果已经添加过action，则不再添加
  public AddActionOnce(action: ActionV2<T>): void {
    if (!this.usedActions.has(action.id)) {
      this.actions[action.id] = action;
      this.usedActions.add(action.id);
    }
  }
  public AddEdge(action: ActionV2<T>, code: ACTION_CODE, edge: ActionEdgeV2): void {
    if (this.edges[action.id] === undefined) {
      this.edges[action.id] = {};
    }
    if (this.edges[action.id][code] === undefined) {
      this.edges[action.id][code] = [];
    }
    this.GetFindAlgorithm().Push(this.edges[action.id][code] as ActionEdgeV2[], edge);
  }
  public DeleteAction(action: ActionV2<T>, edge: boolean, history: boolean): void {
    delete this.actions[action.id];
    if (edge) {
      delete this.edges[action.id];
    }
    if (history) {
      this.usedActions.delete(action.id);
    }
  }
  public DeleteEdge(action: ActionV2<T>, code?: ACTION_CODE): void {
    if (code !== undefined) {
      delete this.edges[action.id][code];
    } else {
      delete this.edges[action.id];
    }
  }
  public DeleteFindEdge(action: ActionV2<T>, code: ACTION_CODE): void {
    if (this.edges[action.id] === undefined || this.edges[action.id][code] === undefined) {
      return;
    }
    this.GetFindAlgorithm().Remove(this.edges[action.id][code] as ActionEdgeV2[]);
  }
  public DeleteActionHistory(action: ActionV2<T>): void {
    this.usedActions.delete(action.id);
  }
  // 对外暴露的函数 根据action和返回的code确定下一步的action 并且对于达到次数的临时边和动作会进行删除
  public GetResponse(action: ActionV2<T>, code: ACTION_CODE): string {
    if (this.edges[action.id] === undefined || this.edges[action.id][code] === undefined) {
      return this.GetDefaultAction().id;
    }
    const edges = this.edges[action.id][code] as ActionEdgeV2[];
    const findId = this.GetFindAlgorithm().FindIndex(edges);
    const target = edges[findId].target;
    if (edges[findId].isTemp) {
      if (edges[findId].count === 1) {
        this.DeleteFindEdge(action, code);
      } else {
        --edges[findId].count;
      }
    }
    if (action.isTemp) {
      this.DeleteAction(action, true, false);
    }
    return target;
  }
}
