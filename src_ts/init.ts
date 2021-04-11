import { pollingSetup } from './module/pollingQueue';
import { mountInit } from './mount';

export function init(): void {
  mountInit();
  pollingSetup();
}
