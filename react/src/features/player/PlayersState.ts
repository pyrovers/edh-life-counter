import { Reducer } from 'react';

export const PlayerId = {
  1: 'player1',
  2: 'player2',
  3: 'player3',
  4: 'player4',
} as const;
export type PlayerId = (typeof PlayerId)[keyof typeof PlayerId];

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
  poisonCount: number;
  manaCount: number;
  energyCount: number;
  commanderACastCount: number;
  commanderBCastCount: number;
  isAscend: boolean;
  commanderDamages: CommanderDamageList;
}

export interface CommanderDamageList {
  byId: PlayerKeyValue<CommanderDamageData>;
  allIds: PlayerId[];
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

export interface PlayersInitialInfo {
  initialLife: number;
  playerCount: number;
}

export const initialPlayersState: PlayersState = {
  byId: {},
  allIds: [],
};

export type PlayersAction =
  | IncrementLife
  | IncrementPoisonCount
  | ResetPoisonCount
  | IncrementEnergyCount
  | ResetEnergyCount
  | IncrementManaCount
  | ResetManaCount
  | IncrementCommanderACastCount
  | ResetCommanderACastCount
  | IncrementCommanderBCastCount
  | ResetCommanderBCastCount
  | IncrementCommanderDamage
  | ResetCommanderDamage
  | ToggleAscend
  | InitializePlayers
  | UnsetPlayers;

export interface IncrementLife {
  type: 'IncrementLife';
  damageInfo: DamageInfo;
}
export interface IncrementPoisonCount {
  type: 'IncrementPoisonCount';
  targetPlayerId: PlayerId;
}
export interface ResetPoisonCount {
  type: 'ResetPoisonCount';
  targetPlayerId: PlayerId;
}
export interface IncrementEnergyCount {
  type: 'IncrementEnergyCount';
  targetPlayerId: PlayerId;
}
export interface ResetEnergyCount {
  type: 'ResetEnergyCount';
  targetPlayerId: PlayerId;
}
export interface IncrementManaCount {
  type: 'IncrementManaCount';
  targetPlayerId: PlayerId;
}
export interface ResetManaCount {
  type: 'ResetManaCount';
  targetPlayerId: PlayerId;
}
export interface IncrementCommanderACastCount {
  type: 'IncrementCommanderACastCount';
  targetPlayerId: PlayerId;
}
export interface ResetCommanderACastCount {
  type: 'ResetCommanderACastCount';
  targetPlayerId: PlayerId;
}
export interface IncrementCommanderBCastCount {
  type: 'IncrementCommanderBCastCount';
  targetPlayerId: PlayerId;
}
export interface ResetCommanderBCastCount {
  type: 'ResetCommanderBCastCount';
  targetPlayerId: PlayerId;
}
export interface IncrementCommanderDamage {
  type: 'IncrementCommanderDamage';
  damageInfo: CommanderDamageInfo;
}
export interface ResetCommanderDamage {
  type: 'ResetCommanderDamage';
  resetInfo: CommanderDamageResetInfo;
}
export interface ToggleAscend {
  type: 'ToggleAscend';
  targetPlayerId: PlayerId;
}
export interface InitializePlayers {
  type: 'InitializePlayers';
  initialInfo: PlayersInitialInfo;
}
export interface UnsetPlayers {
  type: 'UnsetPlayers';
}

export const playersReducer: Reducer<PlayersState, PlayersAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'IncrementLife':
      return incrementLife(state, action.damageInfo);
    case 'IncrementPoisonCount':
      return incrementPoisonCount(state, action.targetPlayerId);
    case 'ResetPoisonCount':
      return resetPoisonCount(state, action.targetPlayerId);
    case 'IncrementEnergyCount':
      return incrementEnergyCount(state, action.targetPlayerId);
    case 'ResetEnergyCount':
      return resetManaCount(state, action.targetPlayerId);
    case 'IncrementManaCount':
      return incrementManaCount(state, action.targetPlayerId);
    case 'ResetManaCount':
      return resetEnergyCount(state, action.targetPlayerId);
    case 'IncrementCommanderACastCount':
      return incrementCommanderACastCount(state, action.targetPlayerId);
    case 'ResetCommanderACastCount':
      return resetCommanderACastCount(state, action.targetPlayerId);
    case 'IncrementCommanderBCastCount':
      return incrementCommanderBCastCount(state, action.targetPlayerId);
    case 'ResetCommanderBCastCount':
      return resetCommanderBCastCount(state, action.targetPlayerId);
    case 'IncrementCommanderDamage':
      return incrementCommanderDamage(state, action.damageInfo);
    case 'ResetCommanderDamage':
      return resetCommanderDamage(state, action.resetInfo);
    case 'ToggleAscend':
      return toggleAscend(state, action.targetPlayerId);
    case 'InitializePlayers':
      return initializePlayers(action.initialInfo);
    case 'UnsetPlayers':
      return unsetPlayers();
  }
};

const incrementLife = (
  state: PlayersState,
  damageInfo: DamageInfo
): PlayersState => {
  const targetPlayer = state.byId[damageInfo.targetPlayerId];
  if (targetPlayer) {
    targetPlayer.life += damageInfo.amount;
  }
  return state;
};

const incrementPoisonCount = (
  state: PlayersState,
  playerId: PlayerId
): PlayersState => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.poisonCount += 1;
  }
  return state;
};

const resetPoisonCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.poisonCount = 0;
  }
  return state;
};

const incrementEnergyCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.energyCount += 1;
  }
  return state;
};

const resetManaCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.manaCount = 0;
  }
  return state;
};

const incrementManaCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.manaCount += 1;
  }
  return state;
};

const resetEnergyCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.energyCount = 0;
  }
  return state;
};

const incrementCommanderACastCount = (
  state: PlayersState,
  playerId: PlayerId
) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.commanderACastCount += 1;
  }
  return state;
};

const resetCommanderACastCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.commanderACastCount = 0;
  }
  return state;
};

const incrementCommanderBCastCount = (
  state: PlayersState,
  playerId: PlayerId
) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.commanderBCastCount += 1;
  }
  return state;
};

const resetCommanderBCastCount = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.commanderBCastCount = 0;
  }
  return state;
};

const incrementCommanderDamage = (
  state: PlayersState,
  damageInfo: CommanderDamageInfo
) => {
  const targetPlayer = state.byId[damageInfo.targetPlayerId];
  if (!targetPlayer) {
    return state;
  }
  const damageOpponent =
    targetPlayer.commanderDamages.byId[damageInfo.opponentId];
  if (!damageOpponent) {
    return state;
  }
  damageOpponent.damage += damageInfo.amount;
  return state;
};

const resetCommanderDamage = (
  state: PlayersState,
  resetInfo: CommanderDamageResetInfo
) => {
  const targetPlayer = state.byId[resetInfo.targetPlayerId];
  if (!targetPlayer) {
    return state;
  }
  const damageOpponent =
    targetPlayer.commanderDamages.byId[resetInfo.opponentId];
  if (!damageOpponent) {
    return state;
  }
  damageOpponent.damage = 0;
  return state;
};

const toggleAscend = (state: PlayersState, playerId: PlayerId) => {
  const targetPlayer = state.byId[playerId];
  if (targetPlayer) {
    targetPlayer.isAscend = !targetPlayer.isAscend;
  }
  return state;
};

const initializePlayers = (initialInfo: PlayersInitialInfo) => {
  return generatePlayers(initialInfo.playerCount, initialInfo.initialLife);
};

const unsetPlayers = () => {
  return initialPlayersState;
};

export const generatePlayers = (playerCount: number, initialLife: number) => {
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
      poisonCount: 0,
      manaCount: 0,
      energyCount: 0,
      commanderACastCount: 0,
      commanderBCastCount: 0,
    };
  });

  const byId: PlayerKeyValue<PlayerData> = {};
  players.forEach((player) => {
    byId[player.id] = player;
  });

  return {
    ...initialPlayersState,
    allIds,
    byId,
  };
};
