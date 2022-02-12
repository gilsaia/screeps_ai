import { CreepGraphModule } from './module/creep_graph';
import { CronJobModule } from './module/cron_job';

declare global {
  namespace NodeJS {
    interface Global {
      Game: Game;
      Memory: Memory;
      _: _.LoDashStatic;
      CronJob: CronJobModule;
      CreepGraph: CreepGraphModule;
    }
  }

  interface Memory {
    uuid: number;
    log: any;
  }
}
