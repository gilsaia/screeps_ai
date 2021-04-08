type queueData = exampleData | standardData | energyCheckData;
interface exampleData {
  exampleStr: string;
}
interface standardData {
  taskName: string;
}
interface PollingTask {
  check(data: queueData): void;
  data: queueData;
  interval: number;
  repeat: boolean;
}
interface PollingQueue {
  registerTask(task: PollingTask): void;
  run(): void;
  taskQueue: PollingTask[][];
}
