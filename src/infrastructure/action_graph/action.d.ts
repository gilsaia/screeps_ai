// 每个Action的返回值 不同的返回值表示当前Action的不同情况
type ACTION_CODE = ACTION_WORKING | ACTION_COMPLETE | ACTION_FAIL | ACTION_WAIT | ACTION_EMPTY | ACTION_CONTINUE;
type ACTION_WORKING = 1;
type ACTION_COMPLETE = 2;
type ACTION_FAIL = 3;
type ACTION_WAIT = 4;
type ACTION_EMPTY = 5;
type ACTION_CONTINUE = 6;

declare const ACTION_WORKING: ACTION_WORKING;
declare const ACTION_COMPLETE: ACTION_COMPLETE;
declare const ACTION_FAIL: ACTION_FAIL;
declare const ACTION_WAIT: ACTION_WAIT;
declare const ACTION_EMPTY: ACTION_EMPTY;
// 语义化的CONTINUE具有特殊含义 表示当前Action完成的同时本回合可进行下一项工作
declare const ACTION_CONTINUE: ACTION_CONTINUE;

// 每个Action都会有自己的配置文件 实体在运行时按照配置文件进行
type ActionConfig = SampleConfig | Sample2Config;
interface SampleConfig {
  information: string;
}
interface Sample2Config {
  information: number;
}

// 对于当前Action不同的返回值对应的下一个Action
interface actionEdge {
  [code: number]: string;
}

// Action是最小的动作元语，一切后续的调度都不能打破Action的最小性质
interface Action<Obj> {
  // 唯一确定Action的id 可能会产生同样的动作但是对于不同的目标产生不同的名称
  // 规定对于不同的Task它的起始和终结Action格式应为`<task_id>:begin`,`<task_id>:end`
  id: string;
  // 当前Action对应的Config 目前无法对于不同的目标生成不同的配置
  config: ActionConfig;
  // 对应的执行动作 返回定义的返回值
  act(obj: Obj, config: ActionConfig): ACTION_CODE;
  // 当前动作链接到的下一个动作
  next: actionEdge;
}
