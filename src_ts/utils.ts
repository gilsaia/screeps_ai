import _ from 'lodash';
import { directionCheck } from './config';

/**
 * 随机生成creep名字
 * role+随机数
 * @param role
 * @param roomName
 */
export const creepName = function (role: RoleConstant, roomName: string): string {
  return roomName + role + _.random(0, 1000).toString();
};
/**
 * 把 obj2 的原型合并到 obj1 的原型上
 *
 * @param obj1 要挂载到的对象
 * @param obj2 要进行挂载的对象
 */
export const assignPrototype = function (obj1: AnyObject, obj2: AnyObject): void {
  Object.getOwnPropertyNames(obj2.prototype).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    obj1.prototype[key] = obj2.prototype[key];
  });
};
/**
 * Check role is baseRole
 * @param role
 */
export const baseRoleValid = function (role: RoleConstant): role is BaseRoleConstant {
  return role === 'harvester' || role === 'upgrader' || role === 'worker';
};
/**
 * Find pos can walk to
 * @param pos
 */
export const findWalkableDir = function (pos: RoomPosition): DirectionConstant {
  const terrain = new Room.Terrain(pos.roomName);
  for (const dir of directionCheck) {
    if (!terrain.get(pos.x + dir[1][0], pos.y + dir[1][1])) {
      return dir[0];
    }
  }
  for (const dir of directionCheck) {
    if (terrain.get(pos.x + dir[1][0], pos.y + dir[1][1]) === TERRAIN_MASK_SWAMP) {
      return dir[0];
    }
  }
  return TOP;
};
/**
 * Logic of take task to multi worker
 */
export const multiTaskTake = function (taskList: RoomTask[]): RoomTask | undefined {
  if (taskList.length) {
    if (taskList[taskList.length - 1].worker > 1) {
      taskList[taskList.length - 1].worker--;
      return taskList[taskList.length - 1];
    } else {
      return taskList.pop();
    }
  }
  return undefined;
};
