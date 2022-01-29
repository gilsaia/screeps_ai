// 循环队列基础实现 实现特定方法提高效率
export class CircleQueue<T> {
  private readonly items: T[];
  private index: number;
  private readonly limit: number;
  public constructor(limit: number) {
    this.items = new Array<T>(limit);
    this.index = 0;
    this.limit = limit;
  }
  // 获取队列当前位置向后的第k个元素
  public getNextK(k: number): T {
    return this.items[(this.index + k) % this.limit];
  }
  // 设置队列当前位置向后的第k个元素
  public setNextK(k: number, item: T): void {
    const cur = (this.index + k) % this.limit;
    delete this.items[cur];
    this.items[cur] = item;
  }
  // 设置队列当前位置的元素
  public set(item: T): void {
    delete this.items[this.index];
    this.items[this.index] = item;
  }
  // 获取队列当前位置的元素
  public check(): T {
    return this.items[this.index];
  }
  // 当前位置处理完成 向后移动一个位置同时删除当前位置元素
  public finish(): void {
    const cur = this.index;
    this.index = (this.index + 1) % this.limit;
    delete this.items[cur];
  }
}
