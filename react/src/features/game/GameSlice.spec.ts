import gameReducer, {
  changeDay,
  changeInitiativePlayer,
  changeMonarchPlayer,
  changeNight,
  GameState,
  incrementCommanderDamage,
  incrementLife,
  resetCommanderDamage,
  setNewGame,
  toggleAscend,
  toggleDayOrNight,
} from './GameSlice';

describe('game reducer', () => {
  const initialState: GameState = {
    monarchPlayerIndex: 2,
    initiativePlayerIndex: 1,
    dayOrNight: 'day',
    players: [
      { commanderDamages: [0, 1, 2], life: 10, isAscend: true },
      { commanderDamages: [2, 0, 4], life: 20, isAscend: false },
      { commanderDamages: [3, 9, 0], life: 30, isAscend: false },
    ],
  };

  it('初期ステートの設定', () => {
    expect(gameReducer(undefined, { type: 'unknown' })).toEqual({
      monarchPlayerIndex: null,
      initiativePlayerIndex: null,
      dayOrNight: null,
      players: [],
    });
  });

  it('新ゲームの開始', () => {
    const actual = gameReducer(
      initialState,
      setNewGame({
        initialLife: 30,
        playerCount: 3,
      })
    );
    expect(actual.players.length).toBe(3);
    expect(actual.players[0].life).toBe(30);
  });

  it('ライフの増加', () => {
    const actual = gameReducer(
      initialState,
      incrementLife({ amount: 1, targetPlayerIndex: 1 })
    );
    expect(actual.players[1].life).toEqual(21);
  });

  it('ライフの減少', () => {
    const actual = gameReducer(
      initialState,
      incrementLife({ amount: -2, targetPlayerIndex: 2 })
    );
    expect(actual.players[2].life).toEqual(28);
  });

  it('統率者ダメージの増加', () => {
    const actual = gameReducer(
      initialState,
      incrementCommanderDamage({
        amount: 1,
        targetPlayerIndex: 1,
        opponentIndex: 0,
      })
    );
    expect(actual.players[1].commanderDamages[0]).toBe(3);
  });

  it('統率者ダメージの減少', () => {
    const actual = gameReducer(
      initialState,
      incrementCommanderDamage({
        amount: -2,
        targetPlayerIndex: 2,
        opponentIndex: 0,
      })
    );
    expect(actual.players[2].commanderDamages[0]).toBe(1);
  });

  it('統率者ダメージのリセット', () => {
    const actual = gameReducer(
      initialState,
      resetCommanderDamage({
        targetPlayerIndex: 2,
        opponentIndex: 0,
      })
    );
    expect(actual.players[2].commanderDamages[0]).toBe(0);
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
    const actual = gameReducer(initialState, changeMonarchPlayer(2));
    expect(actual.monarchPlayerIndex).toBe(2);
  });

  it('イニシアチブプレイヤーの切り替え', () => {
    const actual = gameReducer(initialState, changeInitiativePlayer(0));
    expect(actual.initiativePlayerIndex).toBe(0);
  });

  it('昇殿の切り替え', () => {
    const actual = gameReducer(initialState, toggleAscend(1));
    expect(actual.players[0].isAscend).toBeTruthy();
    expect(actual.players[1].isAscend).toBeTruthy();
    expect(actual.players[2].isAscend).toBeFalsy();
  });
});
