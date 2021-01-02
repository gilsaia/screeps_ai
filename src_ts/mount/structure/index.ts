import { assignPrototype } from '../../utils';
import { spawnExtend } from './spawn';

export default function (): void {
  assignPrototype(StructureSpawn, spawnExtend);
}
