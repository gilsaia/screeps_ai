import { ActionGraphV2, SimpleFindActionAlgorithmV2 } from '../../infrastructure/action_graph/action_graph_v2';

/**
 * @description 针对于Creep的动作图基类 添加死亡动作处理
 */
export class CreepGraphV2 extends ActionGraphV2<Creep> {
  private creepDeathGraph: ActionGraphV2<CreepMemory>;
  private readonly actionDeathLink: ActionDeathLinkTable;
  private readonly actionDeathHistory: ActionDeathHistory;
  private name: string;
  public constructor(name: string, defaultAction: ActionV2<Creep>, defaultDeathAction: ActionV2<CreepMemory>) {
    super(defaultAction, SimpleFindActionAlgorithmV2);
    this.name = name;
    this.creepDeathGraph = new ActionGraphV2<CreepMemory>(defaultDeathAction, SimpleFindActionAlgorithmV2);
    this.actionDeathLink = {};
    this.actionDeathHistory = {};
  }
  // 添加死亡动作 请确保死亡动作除了除了必要的处理外皆为临时动作
  public AddDeathAction(fromCreepActionId: string, action: ActionV2<CreepMemory>, edge?: ActionEdgeV2): void {
    let linkTo: string;
    if (this.actionDeathLink[fromCreepActionId] === undefined) {
      linkTo = this.creepDeathGraph.GetDefaultAction().id;
    } else {
      linkTo = this.actionDeathLink[fromCreepActionId];
    }
    if (edge === undefined) {
      edge = { target: linkTo, isTemp: true, count: 1, priority: 5 };
    }
    this.creepDeathGraph.AddAction(action);
    this.creepDeathGraph.AddEdge(action, ACTION_CONTINUE, edge);
    this.actionDeathLink[fromCreepActionId] = action.id;
    if (this.actionDeathHistory[action.id] === undefined) {
      this.actionDeathHistory[action.id] = [];
    }
    this.actionDeathHistory[action.id].push(fromCreepActionId);
  }
  public DeleteDeathActionLink(action: ActionV2<CreepMemory>): void {
    if (this.actionDeathHistory[action.id] === undefined) {
      return;
    }
    for (const actionDeathHistoryElementElement of this.actionDeathHistory[action.id]) {
      delete this.actionDeathLink[actionDeathHistoryElementElement];
    }
    delete this.actionDeathHistory[action.id];
  }
  // Creep动作图对外保留的工作函数 提供Creep的名称 如果死亡则自动进行对应的死亡action 否则进行正常工作action
  public CreepWork(name: string): void {
    if (Memory.creeps[name] === undefined) {
      return;
    }
    const memory = Memory.creeps[name];
    if (Game.creeps[name] === undefined) {
      const defaultAction = this.creepDeathGraph.GetDefaultAction();
      if (this.actionDeathLink[memory.state] === undefined) {
        defaultAction.act(memory, defaultAction.config);
        return;
      }
      let nowActionId = this.actionDeathLink[memory.state];
      let nowAction = this.creepDeathGraph.GetAction(nowActionId) as ActionV2<CreepMemory>;
      // 临时动作则删除所有存储连向该死亡动作的link
      if (nowAction.isTemp) {
        this.DeleteDeathActionLink(nowAction);
      }
      while (nowActionId !== defaultAction.id) {
        nowAction.act(memory, nowAction.config);
        nowActionId = this.creepDeathGraph.GetResponse(nowAction, ACTION_CONTINUE);
        nowAction = this.creepDeathGraph.GetAction(nowActionId) as ActionV2<CreepMemory>;
      }
      defaultAction.act(memory, defaultAction.config);
    } else {
      const creep = Game.creeps[name];
      let action: ActionV2<Creep>;
      let code: ACTION_CODE = ACTION_CONTINUE;
      while (code === ACTION_CONTINUE) {
        action = this.GetAction(memory.state) as ActionV2<Creep>;
        code = action.act(creep, action.config);
        memory.state = this.GetResponse(action, code);
      }
    }
  }
}
