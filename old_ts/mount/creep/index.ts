import { CreepBase } from './base';
import { assignPrototype } from 'old_ts/utils';

export default function (): void {
  assignPrototype(Creep, CreepBase);
}
