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
    initializeGlobal: (state, action) => {
      return { ...state, ...initialState };
    },
    changeMonarchPlayer: (state, action: PayloadAction<PlayerId>) => {
      state.monarchPlayerId = action.payload;
    },
    changeInitiativePlayer: (state, action: PayloadAction<PlayerId>) => {
      state.initiativePlayerId = action.payload;
    },
    changeDay: (state) => {
      state.dayOrNight = 'day';
    },
    changeNight: (state) => {
      state.dayOrNight = 'night';
    },
    toggleDayOrNight: (state, action: PayloadAction<void>) => {
      state.dayOrNight = state.dayOrNight === 'night' ? 'day' : 'night';
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
} = globalSlice.actions;

export const selectMonarchPlayerId = (state: RootState) => {
  return state.game.global.monarchPlayerId;
};

export const selectInitiativePlayerId = (state: RootState) => {
  return state.game.global.initiativePlayerId;
};

export const selectDayOrNight = (state: RootState) => {
  return state.game.global.dayOrNight;
};

export const selectIsMonarchPlayer = (state: RootState, playerId: PlayerId) => {
  return state.game.global.monarchPlayerId === playerId;
};

const globalReducer = globalSlice.reducer;
export default globalReducer;
