type CreepTaskType = spawnCreep;
type spawnCreep = 'spawnCreep';
interface CreepTasks {
  spawnCreep: RoomTask<spawnCreep> & {
    role: CreepRole;
  };
}
interface Room {
  _creepTaskController: TaskController<CreepTaskType, CreepTasks[CreepTaskType]>;
}
