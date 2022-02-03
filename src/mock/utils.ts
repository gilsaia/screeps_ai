/**
 * 包含任意键值对的类
 */
interface AnyClass {
  new (): any;
  [key: string]: any;
}

/**
 * util - 快捷生成游戏对象创建函数
 *
 * @param MockClass 伪造的基础游戏类
 * @returns 一个函数，可以指定要生成类的任意属性
 */
export const getMock = function <T>(MockClass: AnyClass): (props?: Partial<T>) => T {
  return (props = {}) => Object.assign(new MockClass() as T, props);
};
