/**
 * @description 最简单的调度方法 以简单栈的方式操作
 */
import { GetActionReactionName } from '../../utils/utils';

export const SimpleFindActionAlgorithmV2: FindActionAlgorithmV2 = {
  FindIndex(name: string, edges: ActionEdgeV2[]): number {
    return edges.length - 1;
  },
  Push(name: string, edges: ActionEdgeV2[], newEdge: ActionEdgeV2) {
    edges.push(newEdge);
  },
  Remove(name: string, edges: ActionEdgeV2[]) {
    edges.pop();
  }
};

/**
 * 动作图基类 提供基础的添加修改功能以及最简单的获取回应函数
 */
export class ActionGraphV2<T> {
  protected findAlgorithm: FindActionAlgorithmV2;
  private readonly actions: GraphActionsV2<T>;
  private readonly edges: GraphEdgesV2;
  private readonly usedActions: Set<string>;
  private defaultAction: ActionV2<T>;
  public constructor(defaultAction: ActionV2<T>, findAlgorithm: FindActionAlgorithmV2) {
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
  public GetAction(id: string): ActionV2<T> | undefined {
    if (id === this.defaultAction.id) {
      return this.defaultAction;
    }
    return this.actions[id];
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
    this.GetFindAlgorithm().Push(
      GetActionReactionName(action.id, code),
      this.edges[action.id][code] as ActionEdgeV2[],
      edge
    );
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
    this.GetFindAlgorithm().Remove(
      GetActionReactionName(action.id, code),
      this.edges[action.id][code] as ActionEdgeV2[]
    );
  }
  public DeleteActionHistory(action: ActionV2<T>): void {
    this.usedActions.delete(action.id);
  }
  // 动作图作为基类向扩展类暴露的函数 其他方式调用请慎用 根据action和返回的code确定下一步的action 并且对于达到次数的临时边和动作会进行删除
  public GetResponse(action: ActionV2<T>, code: ACTION_CODE): string {
    if (this.edges[action.id] === undefined || this.edges[action.id][code] === undefined) {
      return this.GetDefaultAction().id;
    }
    const edges = this.edges[action.id][code] as ActionEdgeV2[];
    const findId = this.GetFindAlgorithm().FindIndex(GetActionReactionName(action.id, code), edges);
    const target = edges[findId].target;
    if (edges[findId].isTemp) {
      --edges[findId].count;
      if (edges[findId].count === 0) {
        this.DeleteFindEdge(action, code);
      }
    }
    if (action.isTemp) {
      this.DeleteAction(action, true, false);
    }
    return target;
  }
}
