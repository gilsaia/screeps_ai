type CronJobConfig = SampleConfig | Sample2Config | CronTestConfig;
interface CronTestConfig {
  result: number;
  add: number;
}

/**
 * @description 定时任务构建参数
 * @param EveryRoom 每个房间/全局分别执行任务
 * @param Repeat 执行完后是否重复
 * @param Internal 插入任务时间的几个tick后开始执行
 * @param Immediate 是否在插入时立刻执行
 */
interface CronJobParam {
  EveryRoom: boolean;
  Repeat: boolean;
  Internal: number;
  Immediate: boolean;
}
interface CronJob {
  config: CronJobConfig;
  run(config: CronJobConfig, roomName?: string): void;
  param: CronJobParam;
}
