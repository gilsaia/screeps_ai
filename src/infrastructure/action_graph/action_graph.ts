// 最简单的调度方法 按照简单栈的方式操作
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
// 动作图的基类 提供各项基础功能
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
