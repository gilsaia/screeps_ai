import { assignPrototype } from '../../utils';
import { baseCreep } from './base';

export default function (): void {
  assignPrototype(Creep, baseCreep);
}
