import roomMount from './room';
import structureMount from './structure';

export default function (): void {
  if (!global.hasMount) {
    console.log('start mount');
    structureMount();
    roomMount();
    global.hasMount = true;
    console.log('end mount');
  }
}
