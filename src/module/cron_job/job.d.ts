type CronJobConfig = SampleConfig | Sample2Config | CronTestConfig;
interface CronTestConfig {
  result: number;
  add: number;
}
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
