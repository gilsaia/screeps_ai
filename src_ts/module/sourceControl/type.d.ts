type EnergyBaseSource = Source | StructureContainer | StructureLink;
interface EnergyController {
  getEnergyHarvestSource(room: Room): SourceCondition;
  editBaseSource(baseSourcePos: RoomPosition[]): void;
  getEnergyBaseSource(room: Room, pos: RoomPosition): EnergyBaseSource | undefined;
}
interface SourceCondition {
  sourceId: Id<Source>;
  sourcePos: ScreepsPosition;
  containerPlan: boolean;
  containerComplete: boolean;
  containerId?: Id<StructureContainer | ConstructionSite>;
  containerPos: ScreepsPosition;
}
interface energyCheckData {
  taskName: string;
}
interface Room {
  _energyController: EnergyController;
}
interface RoomMemory {
  sourceCondition: SourceCondition[];
}
