import { ActionGraphV2, SimpleFindActionAlgorithmV2 } from './action_graph_v2';

let actionGraphV2: ActionGraphV2<string>;

const defaultActionV2: ActionV2<string> = {
  id: 'Default',
  category: 'Default',
  isTemp: false,
  config: {
    information: 'Test'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    obj += config.information;
    return ACTION_WORKING;
  }
};

const testAction1: ActionV2<string> = {
  id: '001',
  category: 'Test',
  isTemp: false,
  config: {
    information: '001'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    config.information += obj;
    return ACTION_WORKING;
  }
};

const testAction1Copy: ActionV2<string> = {
  id: '001',
  category: 'Test',
  isTemp: false,
  config: {
    information: '001-C'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    config.information += obj;
    return ACTION_WORKING;
  }
};

const testAction2: ActionV2<string> = {
  id: '002',
  category: 'Test',
  isTemp: false,
  config: {
    information: '002'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    config.information += obj;
    return ACTION_WORKING;
  }
};

const testAction3: ActionV2<string> = {
  id: '003',
  category: 'Test',
  isTemp: true,
  config: {
    information: '003'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    config.information += obj;
    return ACTION_WORKING;
  }
};

const testEdge1: ActionEdgeV2 = {
  target: '002',
  isTemp: false,
  count: 0,
  priority: 5
};

const testEdge2: ActionEdgeV2 = {
  target: 'Default',
  isTemp: true,
  count: 1,
  priority: 5
};

beforeEach(() => {
  actionGraphV2 = new ActionGraphV2<string>(defaultActionV2, SimpleFindActionAlgorithmV2);
});

it('ActionGraph基础功能检查', () => {
  expect(actionGraphV2).toBeDefined();
  expect(actionGraphV2.GetDefaultAction()).toBe(defaultActionV2);
  expect(actionGraphV2.GetFindAlgorithm()).toBe(SimpleFindActionAlgorithmV2);
  actionGraphV2.SetDefaultAction(testAction1);
  expect(actionGraphV2.GetDefaultAction()).toBe(testAction1);
  expect(actionGraphV2.GetAction('Default')).toBeUndefined();
  actionGraphV2.SetDefaultAction(defaultActionV2);
  actionGraphV2.AddAction(testAction1);
  expect(actionGraphV2.GetAction('Default')).toBe(defaultActionV2);
  expect(actionGraphV2.GetAction('001')).toBe(testAction1);
});

it('ActionGraph添加功能检查', () => {
  actionGraphV2.AddActionOnce(testAction1);
  actionGraphV2.AddActionOnce(testAction1Copy);
  expect(actionGraphV2.GetAction('001')).toBe(testAction1);
  actionGraphV2.DeleteAction(testAction1, false, false);
  actionGraphV2.AddActionOnce(testAction1);
  expect(actionGraphV2.GetAction('001')).toBeUndefined();
  actionGraphV2.DeleteActionHistory(testAction1);
  actionGraphV2.AddActionOnce(testAction1);
  const action = actionGraphV2.GetAction('001') as ActionV2<string>;
  expect(action).toBe(testAction1);
  const res = action.act('abc', action.config);
  expect(res).toBe(ACTION_WORKING);
  expect((action.config as SampleConfig).information).toBe('001abc');
});

it('ActionGraph添加边检查', () => {
  actionGraphV2.AddAction(testAction1);
  actionGraphV2.AddAction(testAction2);
  actionGraphV2.AddEdge(testAction1, ACTION_WORKING, testEdge1);
  expect(actionGraphV2.GetResponse(testAction1, ACTION_WORKING)).toBe('002');
  actionGraphV2.DeleteAction(testAction1, true, true);
  expect(actionGraphV2.GetResponse(testAction1, ACTION_WORKING)).toBe('Default');
  actionGraphV2.AddAction(testAction1);
  actionGraphV2.AddEdge(testAction1, ACTION_WORKING, testEdge1);
  actionGraphV2.AddEdge(testAction1, ACTION_WORKING, testEdge2);
  expect(actionGraphV2.GetResponse(testAction1, ACTION_WORKING)).toBe('Default');
  expect(actionGraphV2.GetResponse(testAction1, ACTION_WORKING)).toBe('002');
  actionGraphV2.DeleteFindEdge(testAction2, ACTION_WORKING);
  actionGraphV2.AddEdge(testAction1, ACTION_COMPLETE, testEdge1);
  actionGraphV2.DeleteEdge(testAction1, ACTION_WORKING);
  expect(actionGraphV2.GetResponse(testAction1, ACTION_WORKING)).toBe('Default');
  expect(actionGraphV2.GetResponse(testAction1, ACTION_COMPLETE)).toBe('002');
  actionGraphV2.DeleteEdge(testAction1);
  expect(actionGraphV2.GetResponse(testAction1, ACTION_COMPLETE)).toBe('Default');
});

it('ActionGraph临时动作检查', () => {
  actionGraphV2.AddAction(testAction2);
  actionGraphV2.AddAction(testAction3);
  actionGraphV2.AddEdge(testAction3, ACTION_WORKING, testEdge1);
  expect(actionGraphV2.GetResponse(testAction3, ACTION_WORKING)).toBe('002');
  expect(actionGraphV2.GetAction('003')).toBeUndefined();
});
