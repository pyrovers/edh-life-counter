import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { getLocalStorageValue } from '../utils/localStorage';

import configReducer from '../features/config/ConfigSlice';
import gameReducer from '../features/game/GameSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    game: gameReducer,
  },
  preloadedState: getLocalStorageValue(),
});

export const selectRoot = (rootState: RootState) => {
  return rootState;
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
