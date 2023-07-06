import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ConfigState {
  initialLife: number;
  playerCount: number;
}

export const initialState: ConfigState = {
  initialLife: 40,
  playerCount: 4,
};

export const ConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setInitialLife: (config, action: PayloadAction<number>) => {
      config.initialLife = action.payload;
    },
    setPlayerCount: (config, action: PayloadAction<number>) => {
      config.playerCount = action.payload;
    },
  },
});

export const { setInitialLife, setPlayerCount } = ConfigSlice.actions;

export const selectInitialLife = (rootState: RootState) => {
  return rootState.config.initialLife;
};
export const selectPlayerCount = (rootState: RootState) => {
  return rootState.config.playerCount;
};

export const configReducer = ConfigSlice.reducer;
export default configReducer;
