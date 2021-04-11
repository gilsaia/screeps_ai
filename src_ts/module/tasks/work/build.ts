import { TaskApi } from '../index';

function pollingBuildTaskCheck(data: pollingBuildTaskData): void {
  const pos = new RoomPosition(data.pos.x, data.pos.y, data.roomName);
  const res = pos.lookFor(LOOK_CONSTRUCTION_SITES);
  if (res && res[0]) {
    const task: WorkTasks[build] = {
      type: 'build',
      key: 'build' + res[0].id.toString(),
      priority: 6,
      need: 1,
      id: res[0].id
    };
    TaskApi.addWorkTask(Game.rooms[data.roomName], task);
  }
  return;
}

export function genPollingBuildTask(roomName: string, pos: ScreepsPosition): PollingTask {
  return {
    check: pollingBuildTaskCheck,
    data: {
      roomName,
      pos
    },
    immediate: false,
    repeat: false,
    interval: 1
  };
}
