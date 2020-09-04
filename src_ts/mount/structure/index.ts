import { SpawnExtend } from './spawn';
import { TowerExtend } from './tower';
import { assignPrototype } from 'utils';

export default function (): void {
  assignPrototype(StructureSpawn, SpawnExtend);
  assignPrototype(StructureTower, TowerExtend);
}
