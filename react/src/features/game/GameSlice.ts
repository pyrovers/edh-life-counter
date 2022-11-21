import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ConfigState } from '../config/ConfigSlice';

export interface GameState {
  monarchPlayerIndex: number | null;
  initiativePlayerIndex: number | null;
  dayOrNight: 'day' | 'night' | null;
  players: PlayerInfo[];
}

export interface PlayerInfo {
  life: number;
  isAscend: boolean;
  commanderDamages: number[];
}

export interface DamageInfo {
  targetPlayerIndex: number;
  amount: number;
}
export interface CommanderDamageInfo {
  targetPlayerIndex: number;
  opponentIndex: number;
  amount: number;
}
export interface CommanderDamageResetInfo {
  targetPlayerIndex: number;
  opponentIndex: number;
}

const initialState: GameState = {
  monarchPlayerIndex: null,
  initiativePlayerIndex: null,
  dayOrNight: null,
  players: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeMonarchPlayer: (state, action: PayloadAction<number>) => {
      state.monarchPlayerIndex = action.payload;
    },
    changeInitiativePlayer: (state, action: PayloadAction<number>) => {
      state.initiativePlayerIndex = action.payload;
    },
    toggleDayOrNight: (state, action: PayloadAction<void>) => {
      state.dayOrNight = state.dayOrNight === 'night' ? 'day' : 'night';
    },
    incrementLife: (state, action: PayloadAction<DamageInfo>) => {
      state.players[action.payload.targetPlayerIndex].life +=
        action.payload.amount;
    },
    toggleAscend: (state, action: PayloadAction<number>) => {
      state.players[action.payload].isAscend =
        !state.players[action.payload].isAscend;
    },
    incrementCommanderDamage: (
      state,
      action: PayloadAction<CommanderDamageInfo>
    ) => {
      state.players[action.payload.targetPlayerIndex].commanderDamages[
        action.payload.opponentIndex
      ] += action.payload.amount;
    },
    resetCommanderDamage: (
      sate,
      action: PayloadAction<CommanderDamageResetInfo>
    ) => {
      sate.players[action.payload.targetPlayerIndex].commanderDamages[
        action.payload.opponentIndex
      ] = 0;
    },
    setNewGame: (state, action: PayloadAction<ConfigState>) => {
      const players: PlayerInfo[] = [];
      for (let i = 0; i < action.payload.playerCount; i++) {
        players.push({
          life: action.payload.initialLife,
          commanderDamages: [0, 0, 0, 0],
          isAscend: false,
        });
      }
      state = {
        ...initialState,
        players: [...players],
      };
      return state;
    },
  },
});

export const {
  setNewGame,
  changeInitiativePlayer,
  changeMonarchPlayer,
  toggleDayOrNight,
  incrementLife,
  incrementCommanderDamage,
  resetCommanderDamage,
  toggleAscend,
} = gameSlice.actions;

export const selectMonarchPlayerIndex = (state: RootState) => {
  return state.game.monarchPlayerIndex;
};

export const selectInitiativePlayerIndex = (state: RootState) => {
  return state.game.initiativePlayerIndex;
};

export const selectDayOrNight = (state: RootState) => {
  return state.game.dayOrNight;
};

export const selectPlayers = (state: RootState) => {
  return state.game.players;
};

export const selectLife = (state: RootState, playerIndex: number) => {
  return state.game.players[playerIndex].life;
};

export const selectCommanderDamage = (
  state: RootState,
  playerIndex: number,
  opponentIndex: number
) => {
  return state.game.players[playerIndex].commanderDamages[opponentIndex];
};

export const selectIsMonarchPlayer = (
  state: RootState,
  playerIndex: number
) => {
  return state.game.monarchPlayerIndex === playerIndex;
};

const gameReducer = gameSlice.reducer;
export default gameReducer;
