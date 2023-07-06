import { Reducer } from 'react';

export interface ConfigState {
  initialLife: number;
  playerCount: number;
}

export const initialConfigState: ConfigState = {
  initialLife: 40,
  playerCount: 4,
};

export type ConfigAction = SetInitialLife | SetPlayerCount;

export interface SetInitialLife {
  type: 'SetInitialLife';
  life: number;
}
export interface SetPlayerCount {
  type: 'SetPlayerCount';
  playerCount: number;
}

export const configReducer: Reducer<ConfigState, ConfigAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SetInitialLife':
      return { ...state, initialLife: action.life };
    case 'SetPlayerCount':
      return { ...state, playerCount: action.playerCount };
  }
};
