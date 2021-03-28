export class backupControl extends Room {
  public baseCreepListCorrect(): void {
    const roleMap: BaseRoleConstant[] = [];
    for (const role in this.memory.baseCreepExceptList) {
      roleMap.push(role as BaseRoleConstant);
      this.memory.baseCreepList[role as BaseRoleConstant] = 0;
    }
    const creeps = this.find(FIND_MY_CREEPS, {
      filter(creep) {
        return roleMap.includes(creep.memory.role);
      }
    });
    for (const creep of creeps) {
      this.memory.baseCreepList[creep.memory.role]++;
    }
    return;
  }
}
