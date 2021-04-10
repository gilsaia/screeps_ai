type TransferTaskType = fillExtension | fillTower;
type fillExtension = 'fillExtension';
type fillTower = 'fillTower';
interface TransferTasks {
  fillExtension: RoomTask<fillExtension> & {
    fillId?: Id<Structure>;
  };
  fillTower: RoomTask<fillTower> & {
    id: Id<StructureTower>;
  };
}
type TransferActionGenerator<T extends TransferTaskType> = (creep: Creep, task: TransferTasks[T]) => RoomTaskAction;
interface Room {
  _transferTaskController: TaskController<TransferTaskType, TransferTasks[TransferTaskType]>;
}
