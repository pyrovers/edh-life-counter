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
    setInitialLife: (state, action: PayloadAction<number>) => {
      state.initialLife = action.payload;
    },
    setPlayerCount: (state, action: PayloadAction<number>) => {
      state.playerCount = action.payload;
    },
  },
  // TODO: Effect (Save to Local Storage)
});

export const { setInitialLife, setPlayerCount } = ConfigSlice.actions;

export const selectInitialLife = (state: RootState) => state.config.initialLife;
export const selectPlayerCount = (state: RootState) => state.config.playerCount;

export const configReducer = ConfigSlice.reducer;
export default configReducer;
