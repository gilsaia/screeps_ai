type queueData = exampleData | example2Data;
interface exampleData {
  exampleStr: string;
}
interface example2Data {
  exampleStr: string;
}
interface pollingTask {
  check(data: queueData): void;
  data: queueData;
  interval: number;
  repeat: boolean;
}
interface PollingQueue {
  registerTask(task: pollingTask): void;
  run(): void;
}
