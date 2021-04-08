export default class Fsm<T> implements FiniteStateMachine<T> {
  public setInitState(state: State<T>): void {
    this.initState = state.name;
    this.stateDict[state.name] = state;
    return;
  }
  public getInitState(): string {
    return this.initState;
  }
  public addStateMap(state: State<T>, stateMap: StateMap<T>): void {
    this.stateDict[state.name] = state;
    this.stateTransMap[state.name] = stateMap;
    return;
  }
  public run(stateName: string, target: T): string {
    let state = this.stateDict[stateName];
    if (state) {
      state = this.stateDict[this.initState];
    }
    let stateReturnCode = state.do(target);
    if (stateReturnCode !== STATE_CONTINUE && state.switch) {
      stateReturnCode = state.switch(target);
    }
    if (!this.stateTransMap[state.name][stateReturnCode]) {
      return this.initState;
    }
    return this.stateTransMap[state.name][stateReturnCode].name;
  }

  private initState = '';
  private stateDict: StateDict<T> = {};
  private stateTransMap: StateTransMap<T> = {};
}
