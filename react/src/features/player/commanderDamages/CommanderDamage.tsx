import { FC, PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Ripple } from '../../../components/Ripple';
import { useLongPress } from '../../../hooks/useLongPress';
import { selectDayOrNight } from '../../global/GlobalSlice';
import {
  incrementCommanderDamage,
  resetCommanderDamage,
  PlayerId,
} from '../PlayerSlice';

import styles from './CommanderDamage.module.css';

type Props = PropsWithChildren & {
  playerId: PlayerId;
  opponentId: PlayerId;
};
export const CommanderDamage: FC<Props> = ({ ...props }) => {
  const dayOrNight = useAppSelector(selectDayOrNight);
  const dispatch = useAppDispatch();

  const clickCommanderDamage = () => {
    dispatch(
      incrementCommanderDamage({
        amount: 1,
        opponentId: props.opponentId,
        targetPlayerId: props.playerId,
      })
    );
  };

  const reset = () => {
    dispatch(
      resetCommanderDamage({
        targetPlayerId: props.playerId,
        opponentId: props.opponentId,
      })
    );
  };

  const handleLongPress = useLongPress(reset, 1000, clickCommanderDamage);

  return (
    <Ripple>
      <button
        className={[
          styles.commanderDamage,
          styles[props.opponentId],
          dayOrNight === 'night' ? styles.night : '',
        ].join(' ')}
        {...handleLongPress}
      >
        {props.children}
      </button>
    </Ripple>
  );
};
