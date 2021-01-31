import { assignPrototype } from '../../utils';
import { spawnExtend } from './spawn';
import { towerExtend } from './tower';

export default function (): void {
  assignPrototype(StructureSpawn, spawnExtend);
  assignPrototype(StructureTower, towerExtend);
}
