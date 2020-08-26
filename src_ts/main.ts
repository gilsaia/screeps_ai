import mount from './mount';

// screeps 代码入口
export function loop(): void {
  mount();
  for (const index in Game.spawns) {
    Game.spawns[index].work();
  }
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    } else {
      Game.creeps[name].work();
    }
  }
  console.log(sayHello('world!'));
}

// 定义一个 ts 风格的方法
function sayHello(str: string): string {
  return 'hello' + str;
}
