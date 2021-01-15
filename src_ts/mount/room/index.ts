import { assignPrototype } from '../../utils';
import { backupControl } from './backupControl';
import { creepTask } from './creepTask';

export default function (): void {
  assignPrototype(Room, creepTask);
  assignPrototype(Room, backupControl);
}
