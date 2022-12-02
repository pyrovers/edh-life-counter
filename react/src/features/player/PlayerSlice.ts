import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ConfigState } from '../config/ConfigSlice';

export const PlayerId = {
  1: 'player1',
  2: 'player2',
  3: 'player3',
  4: 'player4',
} as const;
export type PlayerId = typeof PlayerId[keyof typeof PlayerId];

type PlayerKeyValue<T> = {
  [key in PlayerId]?: T;
};

export interface PlayersState {
  byId: PlayerKeyValue<PlayerData>;
  allIds: PlayerId[];
}

export interface PlayerData {
  id: PlayerId;
  life: number;
  isAscend: boolean;
  commanderDamages: {
    byId: PlayerKeyValue<CommanderDamageData>;
    allIds: PlayerId[];
  };
}

export interface CommanderDamageData {
  id: PlayerId;
  damage: number;
}

export interface DamageInfo {
  targetPlayerId: PlayerId;
  amount: number;
}
export interface CommanderDamageInfo {
  targetPlayerId: PlayerId;
  opponentId: PlayerId;
  amount: number;
}
export interface CommanderDamageResetInfo {
  targetPlayerId: PlayerId;
  opponentId: PlayerId;
}

const initialState: PlayersState = {
  byId: {},
  allIds: [],
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    initializePlayers: (state, action: PayloadAction<ConfigState>) => {
      const allIds = Object.values(PlayerId).filter(
        (id, index) => index < action.payload.playerCount
      );

      const players: PlayerData[] = allIds.map((playerId) => {
        const commanderDamages = {
          allIds: allIds.filter((id) => id !== playerId),
          byId: {} as { [key in PlayerId]?: CommanderDamageData },
        };
        commanderDamages.allIds.forEach((opponentId) => {
          commanderDamages.byId[opponentId] = { id: opponentId, damage: 0 };
        });

        return {
          id: playerId,
          isAscend: false,
          life: action.payload.initialLife,
          commanderDamages,
        };
      });

      const byId: PlayerKeyValue<PlayerData> = {};
      players.forEach((player) => {
        byId[player.id] = player;
      });

      state = {
        ...initialState,
        allIds,
        byId,
      };
      return state;
    },
    incrementLife: (state, action: PayloadAction<DamageInfo>) => {
      const targetPlayer = state.byId[action.payload.targetPlayerId];
      if (!targetPlayer) {
        return;
      }
      targetPlayer.life += action.payload.amount;
    },
    toggleAscend: (state, action: PayloadAction<PlayerId>) => {
      const targetPlayer = state.byId[action.payload];
      if (!targetPlayer) {
        return;
      }
      targetPlayer.isAscend = !targetPlayer.isAscend;
    },
    incrementCommanderDamage: (
      state,
      action: PayloadAction<CommanderDamageInfo>
    ) => {
      const targetPlayer = state.byId[action.payload.targetPlayerId];
      if (!targetPlayer) {
        return;
      }
      const damageOpponent =
        targetPlayer.commanderDamages.byId[action.payload.opponentId];
      if (!damageOpponent) {
        return;
      }
      damageOpponent.damage += action.payload.amount;
    },
    resetCommanderDamage: (
      state,
      action: PayloadAction<CommanderDamageResetInfo>
    ) => {
      const targetPlayer = state.byId[action.payload.targetPlayerId];
      if (!targetPlayer) {
        return;
      }
      const damageOpponent =
        targetPlayer.commanderDamages.byId[action.payload.opponentId];
      if (!damageOpponent) {
        return;
      }
      damageOpponent.damage = 0;
    },
  },
});

export const {
  initializePlayers,
  incrementLife,
  incrementCommanderDamage,
  resetCommanderDamage,
  toggleAscend,
} = playerSlice.actions;

export const selectPlayers = (state: RootState) => {
  return state.game.players;
};

export const selectLife = (state: RootState, playerId: PlayerId) => {
  return state.game.players.byId[playerId]?.life;
};

export const selectCommanderDamage = (
  state: RootState,
  playerId: PlayerId,
  opponentId: PlayerId
) => {
  return state.game.players.byId[playerId]?.commanderDamages.byId[opponentId];
};

const playerReducer = playerSlice.reducer;
export default playerReducer;
