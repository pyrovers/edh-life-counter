import { useAppSelector } from '../../app/hooks';
import { GameMenu } from '../gameMenu/GameMenu';
import { DayAndNight } from './dayAndNight/DayAndNight';

import styles from './Global.module.css';
import { selectDayOrNight } from './GlobalSlice';

export const Global = () => {
  const dayOrNight = useAppSelector(selectDayOrNight);

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
