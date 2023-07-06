import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import {
  ConfigActions,
  initialConfigState,
  configReducer,
} from './ConfigState';

export const ConfigContext = createContext({ ...initialConfigState });
export const ConfigDispatchContext = createContext<Dispatch<ConfigActions>>(
  () => {}
);

export interface ConfigProps {}
export const ConfigProvider = ({
  children,
}: PropsWithChildren<ConfigProps>) => {
  const [state, dispatch] = useReducer(configReducer, {
    ...initialConfigState,
  });

  return (
    <ConfigContext.Provider value={state}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigContext.Provider>
  );
};
