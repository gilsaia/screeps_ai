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
  immediate: boolean;
}
interface PollingRoomTask {
  check(data: queueData, room: Room): void;
  data: queueData;
  allRoom: boolean;
  interval: number;
  repeat: boolean;
}
interface PollingQueue {
  registerTask(task: PollingTask): void;
  registerRoomTask(task: PollingRoomTask): void;
  run(): void;
  taskQueue: PollingTask[][];
  roomTaskQueue: PollingRoomTask[][];
}
