import { assignPrototype } from '../../utils';
import { backupControl } from './backupControl';
import { creepTask } from './creepTask';
import { transportTask } from './transportTask';

export default function (): void {
  assignPrototype(Room, creepTask);
  assignPrototype(Room, backupControl);
  assignPrototype(Room, transportTask);
}
