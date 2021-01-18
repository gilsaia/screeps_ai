import { assignPrototype } from '../../utils';
import { backupControl } from './backupControl';
import { buildTask, customConstructionSite } from './buildTask';
import { creepTask } from './creepTask';
import { transportTask } from './transportTask';

export default function (): void {
  assignPrototype(Room, creepTask);
  assignPrototype(Room, backupControl);
  assignPrototype(Room, transportTask);
  assignPrototype(Room, buildTask);
  assignPrototype(RoomPosition, customConstructionSite);
}
