import { CreepBase } from './base';
import { assignPrototype } from 'utils';

export default function (): void {
  assignPrototype(Creep, CreepBase);
}
