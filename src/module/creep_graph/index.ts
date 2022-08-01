import { ActionGraph, SimpleFindAction } from '../../infrastructure/action_graph/action_graph';

/**
 * 针对creep运行的动作图模型
 * @deprecated
 */
export class CreepActionGraph extends ActionGraph<Creep> {
  private name: string;
  public constructor(name: string, defaultAction: Action<Creep>) {
    super(defaultAction, SimpleFindAction);
    this.name = name;
  }

  /**
   * 对外暴露的工作接口 在函数内解决运行问题 不对外暴露其他信息
   * @param creep 工作creep
   */
  public CreepWork(creep: Creep): void {
    if (!creep.memory.state) {
      creep.memory.state = this.GetDefaultAction().id;
    }
    let code: ACTION_CODE = ACTION_CONTINUE;
    let action = this.GetAction(creep.memory.state);
    if (!action) {
      action = this.GetDefaultAction();
      creep.memory.state = action.id;
    }
    while (code === ACTION_CONTINUE) {
      if (creep.memory.state !== action.id) {
        action = this.GetAction(creep.memory.state);
      }
      if (!action) {
        action = this.GetDefaultAction();
        creep.memory.state = action.id;
      }
      code = action.act(creep, action.config);
      creep.memory.state = this.GetResponse(creep.memory.state, code);
    }
  }
}

/**
 * creep工作模块 包含不同的图 内含不同得到工作逻辑针对不同类别的creep
 */
export type CreepGraphModule = {
  [type in CREEP_GRAPH]: CreepActionGraph;
};
