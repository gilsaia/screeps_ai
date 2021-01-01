export class RoomTransport extends Room {
  public addTransportTask(task: TransportTask): void {
    if (!this.memory.transportList) {
      this.memory.transportList = [];
    }
    this.memory.transportList.push(task);
  }
  public takeTransportTask(): TransportTask | undefined {
    if (!this.memory.transportList) {
      this.memory.transportList = [];
    }
    return this.memory.transportList.shift();
  }
  public topTransportTask(): TransportTask | undefined {
    if (!this.memory.transportList) {
      this.memory.transportList = [];
    }
    if (this.memory.transportList.length > 0) {
      return this.memory.transportList[0];
    }
    return undefined;
  }
}
