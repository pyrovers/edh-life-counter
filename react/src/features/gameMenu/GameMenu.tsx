import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { IconButton } from '../../components/IconButton';
import { initializeGlobal, unsetGlobal } from '../global/GlobalSlice';
import { initializePlayers, unsetPlayers } from '../player/PlayerSlice';

import styles from './GameMenu.module.css';

export const GameMenu = () => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const dispatch = useAppDispatch();

  const onClickShowDialog = () => {
    setIsShowDialog(true);
  };

  const onClickCloseDialog = () => {
    setIsShowDialog(false);
  };

  const onClickRestartGame = () => {
    dispatch(initializePlayers());
    dispatch(initializeGlobal());
    onClickCloseDialog();
  };

  const onClickReturnInitial = () => {
    dispatch(unsetPlayers());
    dispatch(unsetGlobal());
    onClickCloseDialog();
  };

  return (
    <>
      <div className={styles.settingOpener}>
        <IconButton icon="gear" onClick={onClickShowDialog} />
      </div>

      {isShowDialog && (
        <div className={styles.dialogBg} onClick={onClickCloseDialog}>
          <div className={styles.dialogContent}>
            <h2 className={styles.menuTitle}>Options</h2>
            <ul className={styles.menuList}>
              <li>
                <button type="button" onClick={onClickRestartGame}>
                  リスタート
                </button>
              </li>
              <li>
                <button type="button" onClick={onClickReturnInitial}>
                  初期設定へ戻る
                </button>
              </li>
              <li>
                <button type="button" onClick={onClickCloseDialog}>
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
