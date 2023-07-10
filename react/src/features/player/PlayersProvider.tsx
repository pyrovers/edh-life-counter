import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import {
  PlayersAction,
  initialPlayersState,
  playersReducer,
} from './PlayersState';

export const PlayersContext = createContext({ ...initialPlayersState });
export const PlayersDispatchContext = createContext<Dispatch<PlayersAction>>(
  () => {}
);

export interface PlayersProps {}
export const PlayersProvider = ({
  children,
}: PropsWithChildren<PlayersProps>) => {
  const [state, dispatch] = useReducer(playersReducer, initialPlayersState);
  return (
    <PlayersContext.Provider value={state}>
      <PlayersDispatchContext.Provider value={dispatch}>
        {children}
      </PlayersDispatchContext.Provider>
    </PlayersContext.Provider>
  );
};
