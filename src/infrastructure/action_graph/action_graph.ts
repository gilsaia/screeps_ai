export class ActionGraph<T> {
  protected findIndex: FindActionAlgorithm;
  private actions: actions<T>;
  private edges: graphEdges;
  private default: Action<T>;
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
    this.findIndex = findAlgorithm;
    this.edges = {};
    this.actions = {};
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
    return this.actions[id] === undefined;
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
    this.edges[source][code].push(targetCondition);
  }
  // 若当前Action未注册则注册Action和临时边 否则不进行操作
  public RegisterActionWithTempEdgeOnce(
    action: Action<T>,
    source: string,
    code: ACTION_CODE,
    targetCondition: TempEdgeCondition
  ): void {
    if (this.actions[action.id] === undefined) {
      return;
    }
    this.checkTempEdge(source, code);
    this.edges[source][code].push(targetCondition);
  }
  // TODO: 删除的多种情况 根据响应获取返回结果
}
