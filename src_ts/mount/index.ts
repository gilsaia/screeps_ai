import { assignPrototype } from '../utils';
import { ExtensionRoomPosition } from './RoomPosition';

const mountList: [AnyClass, AnyClass][] = [[ExtensionRoomPosition, RoomPosition]];

export function mountInit(): void {
  mountList.forEach(item => assignPrototype(item[0], item[1]));
  return;
}
