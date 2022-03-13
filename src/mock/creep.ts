import { getMock } from './utils';

/**
 * 伪造Creep类
 */
class CreepMock {
  public body = [{ type: MOVE, hits: 100 }];
  public fatigue = 0;
  public hits = 100;
  public hitsMax = 100;
  public id: Id<this> = `${new Date().getTime()}${Math.random()}` as Id<this>;
  public memory = {} as CreepMemory;
  public my = true;
  public name = `creep${this.id}`;
}

/**
 * 伪造一个 creep
 * @param props 该 creep 的属性
 */
export const getMockCreep = getMock<Creep>(CreepMock);
