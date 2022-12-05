import React from 'react';

export type Task = {
  title: string;
  done: boolean;
}

const mockData = {
  tasks: [
    { title: 'Buy milk', done: false },
    { title: 'Take out bins', done: false },
  ] as Task[],
};

const mocks: Record<string, (...args: any[]) => any> = {
  'uiGetTasks': () => {
    return mockData.tasks;
  },
  'uiAddTask': (title: string) => {
    mockData.tasks.push({ title, done: false });
    return mockData.tasks;
  },
  'uiTaskDone': (title: string) => {
    const task = mockData.tasks.find(p => p.title === title && !p.done);
    if (task) {
      task.done = true;
    }
    return mockData.tasks;
  }
}

const callFunction = async (functionName: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mocks[functionName](...args);
  }
  return await new Promise((resolve, reject) => {
    // @ts-ignore
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
    [functionName](...args);
  });
}

type ContextState = {
  tasks: Task[],
}

type ScriptLink = ContextState & {
  addTask: (title: string) => Promise<void>,
  taskDone: (title: string) => Promise<void>,
  loading: string | null,
  initialLoading: boolean,
}

const ScriptLinkContext = React.createContext<ScriptLink>({
  tasks: [],
  addTask: async (t: string) => { },
  taskDone: async (t: string) => { },
  loading: null,
  initialLoading: false,
});

export const ScriptLinkProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, setState] = React.useState<ContextState>({
    tasks: [],
  });
  const [loading, setLoading] = React.useState<string | null>(null);
  const startLoad = (type?: string) => setLoading(type ?? '__initial');
  const endLoad = () => setLoading(null);

  const patchState = (newState: Partial<ContextState> = {}) => setState({ ...state, ...newState });

  React.useEffect(() => {
    startLoad();
    callFunction('uiGetTasks')
      .then((tasks: Task[]) => patchState({ tasks }))
      .finally(endLoad);
  }, []);

  const context = {
    ...state,
    loading: loading,
    initialLoading: loading === '__initial',
    addTask: async (title: string) => {
      startLoad('addTask');
      await callFunction('uiAddTask', title)
        .then(tasks => patchState({ tasks }))
        .finally(endLoad);
    },
    taskDone: async (title: string) => {
      startLoad('taskDone');
      await callFunction('uiTaskDone', title)
        .then(tasks => patchState({ tasks }))
        .finally(endLoad);
    },
  }

  return (
    <ScriptLinkContext.Provider value={context}>
      {children}
    </ScriptLinkContext.Provider>
  );
};

export const useScriptLink = () => {
  return React.useContext(ScriptLinkContext);
}