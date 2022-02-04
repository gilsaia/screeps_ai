import { CronJobModule } from './index';

it('环境测试', () => {
  expect(Game).toBeDefined();
  expect(_).toBeDefined();
  expect(Memory).toMatchObject({ rooms: {}, creeps: {} });
});

const testJob: CronJob = {
  config: {
    result: 0,
    add: 3
  },
  param: {
    EveryRoom: false,
    Repeat: false,
    Internal: 3,
    Immediate: true
  },
  run(config: CronTestConfig, roomName?: string) {
    config.result += config.add;
  }
};

const test2Job: CronJob = {
  config: {
    result: 0,
    add: 19
  },
  param: {
    EveryRoom: false,
    Repeat: true,
    Internal: 1,
    Immediate: false
  },
  run(config: CronTestConfig, roomName?: string) {
    config.result += config.add;
  }
};

const test3Job: CronJob = {
  config: {
    result: 0,
    add: 13
  },
  param: {
    EveryRoom: true,
    Repeat: true,
    Internal: 2,
    Immediate: false
  },
  run(config: CronTestConfig, roomName?: string) {
    config.result += config.add;
  }
};

const test4Job: CronJob = {
  config: {
    result: 0,
    add: 8
  },
  param: {
    EveryRoom: true,
    Repeat: true,
    Internal: 2,
    Immediate: true
  },
  run(config: CronTestConfig, roomName?: string) {
    config.result += config.add;
  }
};

it('定时任务测试', () => {
  const cronJob = new CronJobModule(50);
  cronJob.RegisterCronJob(testJob);
  cronJob.RegisterCronJob(test2Job);
  cronJob.RegisterCronJob(test3Job);
  cronJob.RegisterCronJob(test4Job);
  expect((testJob.config as CronTestConfig).result).toBe(3);
  expect((test4Job.config as CronTestConfig).result).toBe(16);
  cronJob.TickRun();
  cronJob.TickRun();
  expect((test2Job.config as CronTestConfig).result).toBe(19);
  cronJob.TickRun();
  expect((testJob.config as CronTestConfig).result).toBe(3);
  expect((test2Job.config as CronTestConfig).result).toBe(38);
  expect((test3Job.config as CronTestConfig).result).toBe(26);
  expect((test4Job.config as CronTestConfig).result).toBe(32);
});
