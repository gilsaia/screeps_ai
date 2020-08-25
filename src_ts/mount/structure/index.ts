import { SpawnExtend } from './spawn';
import { assignPrototype } from 'utils';

export default function (): void {
  assignPrototype(StructureSpawn, SpawnExtend);
}
