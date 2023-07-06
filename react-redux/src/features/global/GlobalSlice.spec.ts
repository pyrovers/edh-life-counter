import gameReducer, {
  GlobalState,
  changeDay,
  changeInitiativePlayer,
  changeMonarchPlayer,
  changeNight,
  toggleDayOrNight,
} from './GlobalSlice';

describe('game reducer', () => {
  const initialState: GlobalState = {
    monarchPlayerId: 'player3',
    initiativePlayerId: 'player2',
    dayOrNight: 'day',
  };

  it('初期ステートの設定', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
      monarchPlayerId: null,
      initiativePlayerId: null,
      dayOrNight: null,
    } as GlobalState);
  });

  it('昼夜の変更', () => {
    const actual1 = gameReducer(initialState, toggleDayOrNight());
    expect(actual1.dayOrNight).toBe('night');
    const actual2 = gameReducer(actual1, toggleDayOrNight());
    expect(actual2.dayOrNight).toBe('day');
  });

  it('昼にする', () => {
    const actual1 = gameReducer(initialState, changeDay());
    expect(actual1.dayOrNight).toBe('day');
  });

  it('夜にする', () => {
    const actual1 = gameReducer(initialState, changeNight());
    expect(actual1.dayOrNight).toBe('night');
  });

  it('統治者の切り替え', () => {
    const actual = gameReducer(initialState, changeMonarchPlayer('player3'));
    expect(actual.monarchPlayerId).toBe('player3');
  });

  it('イニシアチブプレイヤーの切り替え', () => {
    const actual = gameReducer(initialState, changeInitiativePlayer('player1'));
    expect(actual.initiativePlayerId).toBe('player1');
  });
});
