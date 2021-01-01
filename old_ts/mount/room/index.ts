import { RoomCreepControl } from './creepControl';
import { RoomSpawnList } from './spawnlist';
import { RoomTransport } from './transport';
import { assignPrototype } from 'old_ts/utils';


export default function (): void {
  assignPrototype(Room, RoomSpawnList);
  assignPrototype(Room, RoomCreepControl);
  assignPrototype(Room, RoomTransport);
}
