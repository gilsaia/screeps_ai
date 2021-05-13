type CreepRole = BaseCreepRole;
type BaseCreepRole = creepHarvester | creepUpgrader | creepWorker | creepTransfer;

type creepHarvester = 'harvester';
type creepUpgrader = 'upgrader';
type creepWorker = 'worker';
type creepTransfer = 'transfer';

interface creepBodyConfig {
  body: BodyPartConstant;
  num: number;
}

interface BasicCreepConfigApi {
  getBaseCreepBodyPart(role: BaseCreepRole, roomLevel: number): BodyPartConstant[];
}

interface CreepMemory {
  role: CreepRole;
  room: string;
}

interface Room {
  _baseCreepControl: { [role in BaseCreepRole]: number };
}
