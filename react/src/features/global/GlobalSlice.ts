import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PlayerId } from '../player/PlayerSlice';

export interface GlobalState {
  monarchPlayerId: PlayerId | null;
  initiativePlayerId: PlayerId | null;
  dayOrNight: 'day' | 'night' | null;
}

const initialState: GlobalState = {
  monarchPlayerId: null,
  initiativePlayerId: null,
  dayOrNight: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    initializeGlobal: (global) => {
      return { ...global, ...initialState };
    },
    changeMonarchPlayer: (global, action: PayloadAction<PlayerId>) => {
      global.monarchPlayerId = action.payload;
    },
    changeInitiativePlayer: (global, action: PayloadAction<PlayerId>) => {
      global.initiativePlayerId = action.payload;
    },
    changeDay: (global) => {
      global.dayOrNight = 'day';
    },
    changeNight: (global) => {
      global.dayOrNight = 'night';
    },
    toggleDayOrNight: (global, action: PayloadAction<void>) => {
      global.dayOrNight = global.dayOrNight === 'night' ? 'day' : 'night';
    },
    unsetGlobal: () => {
      return initialState;
    },
  },
});

export const {
  initializeGlobal,
  changeInitiativePlayer,
  changeMonarchPlayer,
  changeDay,
  changeNight,
  toggleDayOrNight,
  unsetGlobal,
} = globalSlice.actions;

export const selectMonarchPlayerId = (rootState: RootState) => {
  return rootState.game.global.monarchPlayerId;
};

export const selectInitiativePlayerId = (rootState: RootState) => {
  return rootState.game.global.initiativePlayerId;
};

export const selectDayOrNight = (rootState: RootState) => {
  return rootState.game.global.dayOrNight;
};

export const selectIsMonarchPlayer = (
  rootState: RootState,
  playerId: PlayerId
) => {
  return rootState.game.global.monarchPlayerId === playerId;
};

const globalReducer = globalSlice.reducer;
export default globalReducer;
