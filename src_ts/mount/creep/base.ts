import { creepControlInterval } from '../../config';
import { baseRoles } from '../../role/base';

export class baseCreep extends Creep {
  public work(): void {
    if (this.spawning) {
      return;
    }
    /**
     * Get config
     */
    const config = baseRoles[this.memory.role];
    /**
     * If have counter
     */
    if (config.count) {
      config.count(this, creepControlInterval);
    }
    /**
     * If can change condition
     */
    if (this.memory.working && config.targetSwitch) {
      if (config.targetSwitch(this)) {
        this.memory.working = false;
      }
    } else if (!this.memory.working && config.sourceSwitch) {
      if (config.sourceSwitch(this)) {
        this.memory.working = true;
      }
    }
    /**
     * Get action
     */
    if (this.memory.working && config.target) {
      config.target(this);
    } else {
      config.source(this);
    }
  }
}
