import { baseRoles } from 'old_ts/role/base';

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
        this.memory.working = working = !working;
      }
    }
    if (working && func.target) {
      func.target(this);
    } else {
      func.source(this);
    }
  }
  public getResource(
    target: Structure | Source | Mineral | Deposit,
    resourceType: ResourceConstant
  ): ScreepsReturnCode {
    let result: ScreepsReturnCode;
    if (target instanceof Structure){
      result = this.withdraw(target, resourceType);
    } else {
      result = this.harvest(target);
    }
    if (result === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
    return result;
  }
}
