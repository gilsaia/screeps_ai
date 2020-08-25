import { RoomSpawnList } from './spawnlist';
import { assignPrototype } from 'utils';

export default function (): void {
  assignPrototype(Room, RoomSpawnList);
}
