import { baseRoles } from 'role/base';

export class CreepBase extends Creep {
  public work(): void {
    if (this.spawning) {
      return;
    }
    const func: CreepFunction = baseRoles[this.memory.role];
    if (!func) {
      console.log('No Role Like' + this.memory.role);
      return;
    }
    let working = this.memory.working;
    if (func.switch) {
      if (func.switch(this)) {
        working = !working;
      }
    }
    if (working && func.target) {
      func.target(this);
    } else {
      func.source(this);
    }
  }
}
