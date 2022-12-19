import { GameMenu } from '../gameMenu/GameMenu';
import { DayAndNight } from './dayAndNight/DayAndNight';

import styles from './Global.module.css';

export const Global = () => {
  return (
    <ul className={styles.globalStatus}>
      <li>
        <DayAndNight />
      </li>
      <li>
        <GameMenu />
      </li>
    </ul>
  );
};
