type StateReturnCode = STATE_CONTINUE | STATE_NEXT | STATE_ERR | STATE_INIT;
type STATE_CONTINUE = 0;
type STATE_NEXT = 1;
type STATE_ERR = 2;
type STATE_INIT = 3;

declare const STATE_CONTINUE: STATE_CONTINUE;
declare const STATE_NEXT: STATE_NEXT;
declare const STATE_ERR: STATE_ERR;
declare const STATE_INIT: STATE_INIT;

interface State<T> {
  name: string;
  do(target: T): StateReturnCode;
  switch?(target: T): StateReturnCode;
}

interface StateDict<T> {
  [name: string]: State<T>;
}

interface StateMap<T> {
  [index: number]: State<T>;
}

interface StateTransMap<T> {
  [name: string]: StateMap<T>;
}

interface FiniteStateMachine<T> {
  setInitState(state: State<T>): void;
  getInitState(): string;
  addStateMap(state: State<T>, stateMap: StateMap<T>): void;
  run(stateName: string, target: T): string;
}
