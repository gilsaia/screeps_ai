import { assignPrototype } from '../utils';
import { ExtensionRoomPosition } from './RoomPosition';
import { ExtensionSpawn } from './Structures/Spawn';

const mountList: [AnyClass, AnyClass][] = [
  [ExtensionRoomPosition, RoomPosition],
  [ExtensionSpawn, StructureSpawn]
];

export function mountInit(): void {
  mountList.forEach(item => assignPrototype(item[0], item[1]));
  return;
}
