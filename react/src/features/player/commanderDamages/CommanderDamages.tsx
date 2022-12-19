import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDayOrNight } from '../../global/GlobalSlice';
import {
  CommanderDamageList,
  incrementCommanderDamage,
  PlayerId,
} from '../PlayerSlice';

import styles from './CommanderDamages.module.css';

type Props = {
  playerId: PlayerId;
  data: CommanderDamageList;
};
export const CommanderDamages: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const dayOrNight = useAppSelector(selectDayOrNight);

  const clickCommanderDamage = (
    targetPlayerId: PlayerId,
    opponentId: PlayerId
  ) => {
    dispatch(
      incrementCommanderDamage({
        amount: 1,
        opponentId,
        targetPlayerId,
      })
    );
  };

  return (
    <ul
      className={[
        styles.commanderDamages,
        dayOrNight === 'night' ? styles.night : '',
      ].join(' ')}
    >
      {props.data.allIds.map((opponentId) => (
        <li
          key={opponentId}
          className={styles[`${props.playerId}-${opponentId}`]}
          onClick={() => {
            clickCommanderDamage(props.playerId, opponentId);
          }}
        >
          <button
            className={[styles.commanderDamage, styles[opponentId]].join(' ')}
          >
            {props.data.byId[opponentId]?.damage}
          </button>
        </li>
      ))}
    </ul>
  );
};
