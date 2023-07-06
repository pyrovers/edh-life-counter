import { GlobalState, globalReducer } from './GlobalState';

describe('game reducer', () => {
  const initialState: GlobalState = {
    monarchPlayerId: 'player3',
    initiativePlayerId: 'player2',
    dayOrNight: 'day',
  };

  it('初期ステートの設定', () => {
    expect(globalReducer(initialState, { type: 'InitializeGlobal' })).toEqual({
      monarchPlayerId: null,
      initiativePlayerId: null,
      dayOrNight: null,
    } as GlobalState);
  });

  it('昼夜の変更', () => {
    const actual1 = globalReducer(initialState, {
      type: 'ToggleDayOrNight',
    });
    expect(actual1.dayOrNight).toBe('night');
    const actual2 = globalReducer(actual1, {
      type: 'ToggleDayOrNight',
    });
    expect(actual2.dayOrNight).toBe('day');
  });

  it('昼にする', () => {
    const actual1 = globalReducer(initialState, { type: 'ChangeDay' });
    expect(actual1.dayOrNight).toBe('day');
  });

  it('夜にする', () => {
    const actual1 = globalReducer(initialState, { type: 'ChangeNight' });
    expect(actual1.dayOrNight).toBe('night');
  });

  it('統治者の切り替え', () => {
    const actual = globalReducer(initialState, {
      type: 'ChangeMonarchPlayer',
      monarchPlayerId: 'player3',
    });
    expect(actual.monarchPlayerId).toBe('player3');
  });

  it('イニシアチブプレイヤーの切り替え', () => {
    const actual = globalReducer(initialState, {
      type: 'ChangeInitiativePlayer',
      initiativePlayerId: 'player1',
    });
    expect(actual.initiativePlayerId).toBe('player1');
  });
});
