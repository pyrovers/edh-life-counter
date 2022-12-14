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
            <button type="button" onClick={() => restartGame()}>
              Restart Game
            </button>
            <button type="button" onClick={() => returnInitial()}>
              Return Initial
            </button>
          </div>
        </div>
      )}
    </>
  );
};
