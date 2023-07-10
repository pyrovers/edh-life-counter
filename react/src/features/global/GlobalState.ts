import { Reducer } from 'react';
import { PlayerId } from '../player/PlayersState';

export interface GlobalState {
  monarchPlayerId: PlayerId | null;
  initiativePlayerId: PlayerId | null;
  dayOrNight: 'day' | 'night' | null;
}

export const initialGlobalState: GlobalState = {
  monarchPlayerId: null,
  initiativePlayerId: null,
  dayOrNight: null,
};

export type GlobalAction =
  | InitializeGlobal
  | ChangeMonarchPlayer
  | ChangeInitiativePlayer
  | ChangeDay
  | ChangeNight
  | ToggleDayOrNight
  | UnsetGlobal;

export interface InitializeGlobal {
  type: 'InitializeGlobal';
}
export interface ChangeMonarchPlayer {
  type: 'ChangeMonarchPlayer';
  monarchPlayerId: PlayerId | null;
}
export interface ChangeInitiativePlayer {
  type: 'ChangeInitiativePlayer';
  initiativePlayerId: PlayerId | null;
}
export interface ChangeDay {
  type: 'ChangeDay';
}
export interface ChangeNight {
  type: 'ChangeNight';
}
export interface ToggleDayOrNight {
  type: 'ToggleDayOrNight';
}
export interface UnsetGlobal {
  type: 'UnsetGlobal';
}

export const globalReducer: Reducer<GlobalState, GlobalAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'InitializeGlobal':
      return { ...state, ...initialGlobalState };
    case 'ChangeMonarchPlayer':
      return { ...state, monarchPlayerId: action.monarchPlayerId };
    case 'ChangeInitiativePlayer':
      return { ...state, initiativePlayerId: action.initiativePlayerId };
    case 'ChangeDay':
      return { ...state, dayOrNight: 'day' };
    case 'ChangeNight':
      return { ...state, dayOrNight: 'night' };
    case 'ToggleDayOrNight':
      return {
        ...state,
        dayOrNight: state.dayOrNight === 'night' ? 'day' : 'night',
      };
    case 'UnsetGlobal':
      return { ...initialGlobalState };
  }
};
