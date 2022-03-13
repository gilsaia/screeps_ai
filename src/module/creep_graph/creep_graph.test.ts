import { before } from 'lodash';
import { CreepActionGraph } from './index';
import { getMockCreep } from '../../mock/creep';

const testAction: Action<Creep> = {
  id: 'test-0',
  config: {
    boost: false
  },
  act(obj: Creep, config: ActionConfig): ACTION_CODE {
    return ACTION_COMPLETE;
  },
  next: {
    2: 'test-1'
  }
};

const testActionSec: Action<Creep> = {
  id: 'test-2',
  config: {
    boost: false
  },
  act(obj: Creep, config: ActionConfig): ACTION_CODE {
    return ACTION_CONTINUE;
  },
  next: {
    2: 'test-1'
  }
};

it('执行测试', () => {
  const creepGraph = new CreepActionGraph('test', testAction);
  creepGraph.RegisterAction(testActionSec);
  let creep = getMockCreep();
  creep.memory.state = 'test-0';
  creepGraph.CreepWork(creep);
  expect(creep.memory.state).toBe('test-1');
  creep = getMockCreep();
  creepGraph.CreepWork(creep);
  expect(creep.memory.state).toBe('test-1');
  creep.memory.state = 'test-wrong';
  creepGraph.CreepWork(creep);
  expect(creep.memory.state).toBe('test-1');
  creep.memory.state = 'test-2';
  creepGraph.CreepWork(creep);
  expect(creep.memory.state).toBe('test-1');
  creep.memory.state = 'test-2';
  creepGraph.RegisterTempEdge('test-2', ACTION_CONTINUE, {
    param: {},
    id: 'test-1',
    count: 1
  });
  creepGraph.CreepWork(creep);
  expect(creep.memory.state).toBe('test-1');
});
