type queueData = exampleData | example2Data | energyCheckData;
interface exampleData {
  exampleStr: string;
}
interface example2Data {
  exampleStr: string;
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
