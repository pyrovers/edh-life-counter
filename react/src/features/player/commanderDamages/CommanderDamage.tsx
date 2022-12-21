import { FC, PropsWithChildren } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Ripple } from '../../../components/Ripple';
import { selectDayOrNight } from '../../global/GlobalSlice';
import { incrementCommanderDamage, PlayerId } from '../PlayerSlice';

import styles from './CommanderDamage.module.css';

type Props = PropsWithChildren & {
  playerId: PlayerId;
  opponentId: PlayerId;
};
export const CommanderDamage: FC<Props> = ({ ...props }) => {
  const dayOrNight = useAppSelector(selectDayOrNight);
  const dispatch = useAppDispatch();

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
    <Ripple>
      <button
        onClick={() => {
          clickCommanderDamage(props.playerId, props.opponentId);
        }}
        className={[
          styles.commanderDamage,
          styles[props.opponentId],
          dayOrNight === 'night' ? styles.night : '',
        ].join(' ')}
      >
        {props.children}
      </button>
    </Ripple>
  );
};
