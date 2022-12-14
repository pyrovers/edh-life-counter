import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const generatePlayers = (playerCount: number, initialLife: number) => {
  const allIds = Object.values(PlayerId).filter(
    (id, index) => index < playerCount
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
      life: initialLife,
      commanderDamages,
    };
  });

  const byId: PlayerKeyValue<PlayerData> = {};
  players.forEach((player) => {
    byId[player.id] = player;
  });

  return {
    ...initialState,
    allIds,
    byId,
  };
};

export const initializePlayers = createAsyncThunk(
  `player/initializePlayers`,
  async (player, { getState }) => {
    return (getState() as RootState).config;
  }
);

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    incrementLife: (player, action: PayloadAction<DamageInfo>) => {
      const targetPlayer = player.byId[action.payload.targetPlayerId];
      if (!targetPlayer) {
        return;
      }
      targetPlayer.life += action.payload.amount;
    },
    toggleAscend: (player, action: PayloadAction<PlayerId>) => {
      const targetPlayer = player.byId[action.payload];
      if (!targetPlayer) {
        return;
      }
      targetPlayer.isAscend = !targetPlayer.isAscend;
    },
    incrementCommanderDamage: (
      player,
      action: PayloadAction<CommanderDamageInfo>
    ) => {
      const targetPlayer = player.byId[action.payload.targetPlayerId];
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
      player,
      action: PayloadAction<CommanderDamageResetInfo>
    ) => {
      const targetPlayer = player.byId[action.payload.targetPlayerId];
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
    unsetPlayers: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      initializePlayers.fulfilled,
      (player, action: PayloadAction<ConfigState>) => {
        return generatePlayers(
          action.payload.playerCount,
          action.payload.initialLife
        );
      }
    );
  },
});

export const {
  incrementLife,
  incrementCommanderDamage,
  resetCommanderDamage,
  toggleAscend,
  unsetPlayers,
} = playerSlice.actions;

export const selectPlayers = (rootState: RootState) => {
  return rootState.game.players;
};

export const selectLife = (rootState: RootState, playerId: PlayerId) => {
  return rootState.game.players.byId[playerId]?.life;
};

export const selectCommanderDamage = (
  rootState: RootState,
  playerId: PlayerId,
  opponentId: PlayerId
) => {
  return rootState.game.players.byId[playerId]?.commanderDamages.byId[
    opponentId
  ];
};

const playerReducer = playerSlice.reducer;
export default playerReducer;