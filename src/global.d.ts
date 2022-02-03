declare namespace NodeJS {
  interface Global {
    Game: Game;
    Memory: Memory;
    _: _.LoDashStatic;
  }
}

interface Memory {
  uuid: number;
  log: any;
}

interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
}