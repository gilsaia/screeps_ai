export class TransferTaskController extends BaseTaskController<TransferTaskType, TransferTasks[TransferTaskType]> {
  public constructor(room: Room) {
    super(room, 'TransferTask');
  }
}
