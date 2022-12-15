import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { unsetGlobal } from '../global/GlobalSlice';
import { initializePlayers, unsetPlayers } from '../player/PlayerSlice';

import styles from './GameMenu.module.css';

export const GameMenu = () => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    setIsShowDialog(false);
  };

  const restartGame = () => {
    dispatch(initializePlayers());
    closeDialog();
  };

  const returnInitial = () => {
    dispatch(unsetPlayers());
    dispatch(unsetGlobal());
    closeDialog();
  };

  return (
    <>
      <button type="button" onClick={() => setIsShowDialog(true)}>
        menu
      </button>

      {isShowDialog && (
        <div className={styles.dialogBg} onClick={() => closeDialog()}>
          <div className={styles.dialogContent}>
            <h2 className={styles.menuTitle}>Options</h2>
            <ul className={styles.menuList}>
              <li>
                <button type="button" onClick={() => restartGame()}>
                  リスタート
                </button>
              </li>
              <li>
                <button type="button" onClick={() => returnInitial()}>
                  初期設定へ戻る
                </button>
              </li>
              <li>
                <button type="button" onClick={() => closeDialog()}>
                  閉じる
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
