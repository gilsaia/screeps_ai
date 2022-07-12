/**
 * Source的情况记录 会对不同的creep分配不同的Source
 */
interface SourceCondition {
  source: Source;
  priority: number;
  minorNumber: number;
}

/**
 * 每个房间的资源控制模块 负责资源的分配等等
 */
interface RoomResourceControlModule {
  room: string;
  sourceCondition: SourceCondition[];
}

/**
 * 记录每个房间控制的map
 */
interface ResourceControlMap {
  [room: string]: RoomResourceControlModule;
}
