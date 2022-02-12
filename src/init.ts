import { CRON_JOB_LIMIT } from './config';
import { CronJobModule } from './module/cron_job';

export function init(): void {
  cronInit(CRON_JOB_LIMIT);
}

function cronInit(limit: number): void {
  if (!global.CronJob) {
    global.CronJob = new CronJobModule(limit);
  }
}
