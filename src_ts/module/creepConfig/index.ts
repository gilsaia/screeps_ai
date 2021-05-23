import { BaseCreepRolePart } from './config';

export const CreepConfigApi: BasicCreepConfigApi = {
  getBaseCreepBodyPart(role: BaseCreepRole, stage: number): BodyPartConstant[] {
    return calCreepBodyPart(BaseCreepRolePart[role][stage]);
  }
};
function calCreepBodyPart(bodyConfigs: creepBodyConfig[]): BodyPartConstant[] {
  const bodyParts = bodyConfigs.map(bodyConfig => Array(bodyConfig.num).fill(bodyConfig.body) as BodyPartConstant[]);
  let res: BodyPartConstant[] = [];
  res = res.concat(...bodyParts);
  return res;
}
