import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { getLocalStorageValue, statePersistentMiddleware } from './persistent';

import configReducer from '../features/config/ConfigSlice';
import gameReducer from '../features/game/GameSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(statePersistentMiddleware.middleware);
  },
  preloadedState: getLocalStorageValue(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
