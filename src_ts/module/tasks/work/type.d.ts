type WorkTaskType = build | repair;
type build = 'build';
type repair = 'repair';
interface WorkTasks {
  build: RoomTask<build> & {
    id: Id<ConstructionSite>;
  };
  repair: RoomTask<repair> & {
    id: Id<Structure>;
  };
}
type WorkActionGenerator<T extends WorkTaskType> = (creep: Creep, task: WorkTasks[T]) => RoomTaskAction;
interface Room {
  _workTaskController: TaskController<WorkTaskType, WorkTasks[WorkTaskType]>;
}
interface pollingBuildTaskData {
  roomName: string;
  pos: ScreepsPosition;
}
