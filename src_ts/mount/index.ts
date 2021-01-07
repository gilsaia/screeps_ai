import roomMount from './room';
import structureMount from './structure';
import creepMount from './creep';
export default function (): void {
  if (!global.hasMount) {
    console.log('start mount');
    roomMount();
    structureMount();
    creepMount();
    global.hasMount = true;
    console.log('end mount');
  }
}
