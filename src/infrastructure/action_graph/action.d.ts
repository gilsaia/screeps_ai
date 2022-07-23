// 每个Action的返回值 不同的返回值表示当前Action的不同情况
type ACTION_CODE =
  | ACTION_WORKING
  | ACTION_COMPLETE
  | ACTION_FAIL
  | ACTION_WAIT
  | ACTION_EMPTY
  | ACTION_CONTINUE
  | ACTION_WRONG;
type ACTION_WORKING = 1;
type ACTION_COMPLETE = 2;
type ACTION_FAIL = 3;
type ACTION_WAIT = 4;
type ACTION_EMPTY = 5;
type ACTION_CONTINUE = 6;
type ACTION_WRONG = 7;

declare const ACTION_WORKING: ACTION_WORKING;
declare const ACTION_COMPLETE: ACTION_COMPLETE;
declare const ACTION_FAIL: ACTION_FAIL;
declare const ACTION_WAIT: ACTION_WAIT;
declare const ACTION_EMPTY: ACTION_EMPTY;
// CONTINUE具有特殊含义 表示当前Action完成的同时本回合可进行下一项工作
declare const ACTION_CONTINUE: ACTION_CONTINUE;
declare const ACTION_WRONG: ACTION_WRONG;

// 每个Action都会有自己的配置文件 实体在运行时按照配置文件进行
type ActionConfig = SampleConfig | Sample2Config | CreepActionConfig;
interface SampleConfig {
  information: string;
}
interface Sample2Config {
  information: number;
}

// 对于当前Action不同的返回值对应的下一个Action
/**
 * @deprecated
 */
interface ActionEdge {
  [code: number]: string;
}

// Action是最小的动作元语，一切后续的调度都不能打破Action的最小性质
/**
 * @deprecated
 */
interface Action<Obj> {
  // 唯一确定Action的id 可能会产生同样的动作但是对于不同的目标产生不同的名称
  // 规定对于不同的Task它的起始和终结Action格式应为`<task_id>:begin`,`<task_id>:end`
  id: string;
  // 当前Action对应的Config 目前无法对于不同的目标生成不同的配置
  config: ActionConfig;
  // 对应的执行动作 返回定义的返回值
  act(obj: Obj, config: ActionConfig): ACTION_CODE;
  // 当前动作链接到的下一个动作
  next: ActionEdge;
}

type ACTION_CATEGORY = ACTION_CATEGORY_TEMP | ACTION_CATEGORY_FOREVER;
type ACTION_CATEGORY_TEMP = 'temp';
type ACTION_CATEGORY_FOREVER = 'forever';

/**
 * @description 最小动作元语 任何调度都不会打破Action的最小性质
 */
interface ActionV2<Obj> {
  // id在同一个graph中保持唯一 细节不同可以添加不同后缀
  id: string;
  // Action的类别 包括临时/长期等
  category: ACTION_CATEGORY;
  // Action的配置信息 包含具体的情况
  config: ActionConfig;
  // 执行动作
  act(obj: Obj): ACTION_CODE;
}
