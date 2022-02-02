import { CircleQueue } from '../../infrastructure/circle_queue';

// 定时任务模块 提供注册任务和运行两个接口
export class CronJobModule {
  private queue: CircleQueue<CronJob[]>;
  public constructor(tickLimit: number) {
    this.queue = new CircleQueue<CronJob[]>(tickLimit);
  }
  private static runCronJob(job: CronJob): void {
    if (job.param.EveryRoom) {
      for (const room in Game.rooms) {
        job.run(job.config, room);
      }
    } else {
      job.run(job.config);
    }
  }
  // 注册定时任务
  public RegisterCronJob(job: CronJob): void {
    if (job.param.Immediate) {
      CronJobModule.runCronJob(job);
      if (!job.param.Repeat) {
        return;
      }
      job.param.Immediate = false;
    }
    const items = this.queue.getNextK(job.param.Internal);
    if (items === undefined) {
      this.queue.setNextK(job.param.Internal, [job]);
    } else {
      items.push(job);
    }
  }
  // 每Tick运行函数
  public TickRun(): void {
    const jobs = this.queue.check();
    if (jobs === undefined) {
      this.queue.finish();
      return;
    }
    for (const job of jobs) {
      CronJobModule.runCronJob(job);
      if (job.param.Repeat) {
        this.RegisterCronJob(job);
      }
    }
    this.queue.finish();
  }
}
