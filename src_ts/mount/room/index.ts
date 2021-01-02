import { assignPrototype } from '../../utils';
import { creepTask } from './creepTask';

export default function (): void {
  assignPrototype(Room, creepTask);
}
