import { ActionGraph, SimpleFindAction } from './action_graph';

let actionGraph: ActionGraph<string>;

const defaultAction: Action<string> = {
  id: 'Test',
  config: {
    information: '5'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    obj += config.information;
    return ACTION_COMPLETE;
  },
  next: {
    2: 'Fault',
    6: 'Next'
  }
};

const testAction: Action<string> = {
  id: 'Fault',
  config: {
    information: '254'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    obj += config.information;
    return ACTION_WORKING;
  },
  next: {
    1: 'Next'
  }
};

const test2Action: Action<string> = {
  id: 'Fault',
  config: {
    information: '254'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    obj += config.information;
    return ACTION_WORKING;
  },
  next: {
    1: 'Next'
  }
};

const nextAction: Action<string> = {
  id: 'Next',
  config: {
    information: '173'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    obj += config.information;
    return ACTION_WORKING;
  },
  next: {
    1: 'Next'
  }
};

const thirdAction: Action<string> = {
  id: 'Third',
  config: {
    information: '173'
  },
  act(obj: string, config: SampleConfig): ACTION_CODE {
    obj += config.information;
    return ACTION_WORKING;
  },
  next: {
    1: 'Next'
  }
};

beforeEach(() => {
  actionGraph = new ActionGraph<string>(defaultAction, SimpleFindAction);
});

it('Action注册/检查存在', () => {
  expect(actionGraph.GetDefaultAction()).toBe(defaultAction);
  expect(actionGraph.GetAction('Fault')).toBe(undefined);
  expect(actionGraph.ExistAction('Fault')).toBe(false);
  actionGraph.RegisterAction(testAction);
  expect(actionGraph.GetAction('Fault')).toBe(testAction);
  expect(actionGraph.ExistAction('Fault')).toBe(true);
  actionGraph.RegisterAction(test2Action);
  expect(actionGraph.GetAction('Fault')).not.toBe(test2Action);
  actionGraph.RemoveAction('Fault');
  expect(actionGraph.GetAction('Fault')).toBe(undefined);
  expect(actionGraph.ExistAction('Fault')).toBe(false);
  actionGraph.RemoveAction('Test');
  expect(actionGraph.ExistAction('Test')).toBe(true);
});

it('临时边注册/检查', () => {
  actionGraph.RegisterAction(testAction);
  const ACTION_WORKING = 1;
  const ACTION_WAIT = 4;
  const ACTION_CONTINUE = 6;
  expect(actionGraph.GetResponse('Fault', ACTION_WORKING)).toBe('Next');
  expect(actionGraph.GetResponse('Fault', ACTION_WAIT)).toBe('Test');
  const temp: TempEdgeCondition = {
    id: 'Third',
    count: 1
  };
  actionGraph.RegisterActionWithTempEdgeOnce(thirdAction, 'Fault', ACTION_WORKING, temp);
  actionGraph.RegisterActionWithTempEdgeOnce(thirdAction, 'Fault', ACTION_WORKING, temp);
  expect(actionGraph.GetResponse('Fault', ACTION_WORKING)).toBe('Third');
  expect(actionGraph.GetResponse('Fault', ACTION_WORKING)).toBe('Next');
  expect(actionGraph.ExistAction('Third')).toBe(false);
  temp.count = 1;
  actionGraph.RegisterTempEdge('Fault', ACTION_WORKING, temp);
  actionGraph.RegisterAction(thirdAction);
  expect(actionGraph.GetResponse('Fault', ACTION_WORKING, { onlyRemoveEdge: true })).toBe('Third');
  expect(actionGraph.ExistAction('Third')).toBe(true);
  actionGraph.RemoveTempEdgeWithAction('Fault', ACTION_WAIT, 0);
  temp.count = 1;
  temp.id = 'Test';
  actionGraph.RegisterTempEdge('Fault', ACTION_CONTINUE, temp);
  actionGraph.RemoveTempEdgeWithAction('Fault', ACTION_CONTINUE, 0);
  actionGraph.RemoveTempEdge('Fault', ACTION_WAIT);
  expect(actionGraph.GetResponse('Fault', ACTION_CONTINUE, { onlyRemoveEdge: true })).toBe('Test');
});
