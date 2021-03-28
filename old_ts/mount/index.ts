import roomMount from './room';
import structureMount from './structure';
import creepMount from './creep';
export default function (): void {
  console.log('start mount');
  roomMount();
  structureMount();
  creepMount();
  console.log('end mount');
}
