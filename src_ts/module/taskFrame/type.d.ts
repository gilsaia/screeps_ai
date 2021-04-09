interface RoomTask<T extends string> {
  type: T;
  key?: string;
  priority?: number;
  need: number;
}
interface RoomTaskAction {
  (): boolean;
}
interface RoomMemory {
  [taskName: string]: string;
}
