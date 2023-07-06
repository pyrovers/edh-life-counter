import { useContext } from 'react';
import { GameMenu } from '../gameMenu/GameMenu';
import { DayAndNight } from './dayAndNight/DayAndNight';

import styles from './Global.module.css';
import { GlobalContext } from './GlobalProvider';

export const Global = () => {
  const { dayOrNight } = useContext(GlobalContext);

  return (
    <ul
      className={[
        styles.globalStatus,
        dayOrNight === 'night' ? styles.night : '',
      ].join(' ')}
    >
      <li>
        <DayAndNight />
      </li>
      <li>
        <GameMenu />
      </li>
    </ul>
  );
};
