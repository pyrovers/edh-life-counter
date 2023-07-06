import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import {
  GlobalActions,
  globalReducer,
  initialGlobalState,
} from './GlobalState';

export const GlobalContext = createContext({ ...initialGlobalState });
export const GlobalDispatchContext = createContext<Dispatch<GlobalActions>>(
  () => {}
);

export interface GlobalProviderProps {}
export const GlobalProvider = ({
  children,
}: PropsWithChildren<GlobalProviderProps>) => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
};
