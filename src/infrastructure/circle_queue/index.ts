export class circleQueue<T> {
  private readonly items: T[];
  private index: number;
  private readonly limit: number;
  public constructor(limit: number) {
    this.items = new Array<T>(limit);
    this.index = 0;
    this.limit = limit;
  }
  public getNextK(k: number): T {
    return this.items[(this.index + k) % this.limit];
  }
  public setNextK(k: number, item: T): void {
    const cur = (this.index + k) % this.limit;
    delete this.items[cur];
    this.items[cur] = item;
  }
  public set(item: T): void {
    delete this.items[this.index];
    this.items[this.index] = item;
  }
  public check(): T {
    return this.items[this.index];
  }
  public finish(): void {
    const cur = this.index;
    this.index = (this.index + 1) % this.limit;
    delete this.items[cur];
  }
}
