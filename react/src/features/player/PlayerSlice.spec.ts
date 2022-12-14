import playerReducer, {
  PlayersState,
  incrementCommanderDamage,
  incrementLife,
  resetCommanderDamage,
  toggleAscend,
  initializePlayers,
} from './PlayerSlice';

describe('player reducer', () => {
  const initialState: PlayersState = {
    byId: {
      player1: {
        id: 'player1',
        commanderDamages: {
          byId: {
            player2: {
              id: 'player2',
              damage: 1,
            },
            player3: {
              id: 'player3',
              damage: 2,
            },
          },
          allIds: ['player2', 'player3'],
        },
        life: 10,
        isAscend: true,
      },
      player2: {
        id: 'player2',
        commanderDamages: {
          byId: {
            player1: {
              id: 'player1',
              damage: 2,
            },
            player3: {
              id: 'player3',
              damage: 4,
            },
          },
          allIds: ['player1', 'player3'],
        },
        life: 20,
        isAscend: false,
      },
      player3: {
        id: 'player3',
        commanderDamages: {
          byId: {
            player1: {
              id: 'player1',
              damage: 3,
            },
            player2: {
              id: 'player2',
              damage: 9,
            },
          },
          allIds: ['player1', 'player2'],
        },
        life: 30,
        isAscend: false,
      },
    },
    allIds: ['player1', 'player2', 'player3'],
  };

  it('初期ステートの設定', () => {
    expect(playerReducer(undefined, { type: 'unknown' })).toEqual({
      byId: {},
      allIds: [],
    } as PlayersState);
  });

  it('プレイヤー情報の初期化 - 2人', () => {
    const actual = playerReducer(initialState, {
      type: initializePlayers.fulfilled.type,
      payload: { initialLife: 40, playerCount: 2 },
    });
    expect(actual.allIds.length).toBe(2);
    expect(actual.allIds.includes('player1')).toBeTruthy();
    expect(actual.allIds.includes('player2')).toBeTruthy();
    expect(actual.allIds.includes('player3')).toBeFalsy();
    expect(actual.allIds.includes('player4')).toBeFalsy();

    const player1 = actual.byId.player1;
    const player2 = actual.byId.player2;
    const player3 = actual.byId.player3;
    const player4 = actual.byId.player4;
    expect(player1).toBeTruthy();
    expect(player2).toBeTruthy();
    expect(player3).toBeUndefined();
    expect(player4).toBeUndefined();
    expect(player1?.life).toBe(40);
    expect(player2?.life).toBe(40);
    expect(player1?.isAscend).toBeFalsy();
    expect(player2?.isAscend).toBeFalsy();
    expect(player1?.commanderDamages.allIds.length).toBe(1);
    expect(player2?.commanderDamages.allIds.length).toBe(1);
    expect(player1?.commanderDamages.allIds.includes('player2')).toBeTruthy();
    expect(player2?.commanderDamages.allIds.includes('player1')).toBeTruthy();
  });

  it('プレイヤー情報の初期化 - 3人', () => {
    const actual = playerReducer(initialState, {
      type: initializePlayers.fulfilled.type,
      payload: { initialLife: 30, playerCount: 3 },
    });
    expect(actual.allIds.length).toBe(3);
    expect(actual.allIds.includes('player1')).toBeTruthy();
    expect(actual.allIds.includes('player2')).toBeTruthy();
    expect(actual.allIds.includes('player3')).toBeTruthy();
    expect(actual.allIds.includes('player4')).toBeFalsy();

    const player1 = actual.byId.player1;
    const player2 = actual.byId.player2;
    const player3 = actual.byId.player3;
    const player4 = actual.byId.player4;
    expect(player1).toBeTruthy();
    expect(player2).toBeTruthy();
    expect(player3).toBeTruthy();
    expect(player4).toBeUndefined();
    expect(player1?.life).toBe(30);
    expect(player2?.life).toBe(30);
    expect(player3?.life).toBe(30);
    expect(player1?.isAscend).toBeFalsy();
    expect(player2?.isAscend).toBeFalsy();
    expect(player3?.isAscend).toBeFalsy();
    expect(player1?.commanderDamages.allIds.length).toBe(2);
    expect(player2?.commanderDamages.allIds.length).toBe(2);
    expect(player3?.commanderDamages.allIds.length).toBe(2);
    expect(player1?.commanderDamages.allIds.includes('player2')).toBeTruthy();
    expect(player1?.commanderDamages.allIds.includes('player3')).toBeTruthy();
    expect(player2?.commanderDamages.allIds.includes('player1')).toBeTruthy();
    expect(player2?.commanderDamages.allIds.includes('player3')).toBeTruthy();
    expect(player3?.commanderDamages.allIds.includes('player1')).toBeTruthy();
    expect(player3?.commanderDamages.allIds.includes('player2')).toBeTruthy();
  });

  it('プレイヤー情報の初期化 - 4人', () => {
    const actual = playerReducer(initialState, {
      type: initializePlayers.fulfilled.type,
      payload: { initialLife: 20, playerCount: 4 },
    });
    expect(actual.allIds.length).toBe(4);
    expect(actual.allIds.includes('player1')).toBeTruthy();
    expect(actual.allIds.includes('player2')).toBeTruthy();
    expect(actual.allIds.includes('player3')).toBeTruthy();
    expect(actual.allIds.includes('player4')).toBeTruthy();

    const player1 = actual.byId.player1;
    const player2 = actual.byId.player2;
    const player3 = actual.byId.player3;
    const player4 = actual.byId.player4;
    expect(player1).toBeTruthy();
    expect(player2).toBeTruthy();
    expect(player3).toBeTruthy();
    expect(player4).toBeTruthy();
    expect(player1?.life).toBe(20);
    expect(player2?.life).toBe(20);
    expect(player3?.life).toBe(20);
    expect(player4?.life).toBe(20);
    expect(player1?.isAscend).toBeFalsy();
    expect(player2?.isAscend).toBeFalsy();
    expect(player3?.isAscend).toBeFalsy();
    expect(player4?.isAscend).toBeFalsy();
    expect(player1?.commanderDamages.allIds.length).toBe(3);
    expect(player2?.commanderDamages.allIds.length).toBe(3);
    expect(player3?.commanderDamages.allIds.length).toBe(3);
    expect(player4?.commanderDamages.allIds.length).toBe(3);
    expect(player1?.commanderDamages.allIds.includes('player2')).toBeTruthy();
    expect(player1?.commanderDamages.allIds.includes('player3')).toBeTruthy();
    expect(player1?.commanderDamages.allIds.includes('player4')).toBeTruthy();
    expect(player2?.commanderDamages.allIds.includes('player1')).toBeTruthy();
    expect(player2?.commanderDamages.allIds.includes('player3')).toBeTruthy();
    expect(player2?.commanderDamages.allIds.includes('player4')).toBeTruthy();
    expect(player3?.commanderDamages.allIds.includes('player1')).toBeTruthy();
    expect(player3?.commanderDamages.allIds.includes('player2')).toBeTruthy();
    expect(player3?.commanderDamages.allIds.includes('player4')).toBeTruthy();
    expect(player4?.commanderDamages.allIds.includes('player1')).toBeTruthy();
    expect(player4?.commanderDamages.allIds.includes('player2')).toBeTruthy();
    expect(player4?.commanderDamages.allIds.includes('player3')).toBeTruthy();
  });

  it('ライフの増加', () => {
    const actual = playerReducer(
      initialState,
      incrementLife({ amount: 1, targetPlayerId: 'player2' })
    );
    expect(actual.byId['player2']?.life).toBe(21);
  });

  it('ライフの減少', () => {
    const actual = playerReducer(
      initialState,
      incrementLife({ amount: -2, targetPlayerId: 'player3' })
    );
    expect(actual.byId['player3']?.life).toBe(28);
  });

  it('統率者ダメージの増加', () => {
    const actual = playerReducer(
      initialState,
      incrementCommanderDamage({
        amount: 1,
        targetPlayerId: 'player2',
        opponentId: 'player1',
      })
    );
    expect(
      actual.byId['player2']?.commanderDamages.byId['player1']?.damage
    ).toBe(3);
  });

  it('統率者ダメージの減少', () => {
    const actual = playerReducer(
      initialState,
      incrementCommanderDamage({
        amount: -2,
        targetPlayerId: 'player3',
        opponentId: 'player1',
      })
    );
    expect(
      actual.byId['player3']?.commanderDamages.byId['player1']?.damage
    ).toBe(1);
  });

  it('統率者ダメージのリセット', () => {
    const actual = playerReducer(
      initialState,
      resetCommanderDamage({
        targetPlayerId: 'player3',
        opponentId: 'player1',
      })
    );
    expect(
      actual.byId['player3']?.commanderDamages.byId['player1']?.damage
    ).toBe(0);
  });

  it('昇殿の切り替え', () => {
    const actual = playerReducer(initialState, toggleAscend('player2'));
    expect(actual.byId['player1']?.isAscend).toBeTruthy();
    expect(actual.byId['player2']?.isAscend).toBeTruthy();
    expect(actual.byId['player3']?.isAscend).toBeFalsy();
  });
});
