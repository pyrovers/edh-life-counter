import { FC, useContext } from 'react';
import { IconButton } from '../../components/IconButton';
import { Ripple } from '../../components/Ripple';
import styles from './Spinner.module.css';
import { PlayersDispatchContext } from './PlayersProvider';
import { PlayerId } from './PlayersState';

type Props = {
  step: 1 | 5 | 10;
  playerId: PlayerId;
};
export const Spinner: FC<Props> = ({ ...props }) => {
  const dispatch = useContext(PlayersDispatchContext);

  const onClickIncrement = () =>
    dispatch({
      type: 'IncrementLife',
      damageInfo: {
        amount: props.step,
        targetPlayerId: props.playerId,
      },
    });

  const onClickDecrement = () =>
    dispatch({
      type: 'IncrementLife',
      damageInfo: {
        amount: -props.step,
        targetPlayerId: props.playerId,
      },
    });

  return (
    <>
      <div className={styles.container}>
        <Ripple>
          <IconButton
            icon="caret-up"
            type="button"
            isActive={true}
            onClick={onClickIncrement}
          />
        </Ripple>
        <span className={styles.step}>{props.step}</span>
        <Ripple>
          <IconButton
            icon="caret-down"
            type="button"
            isActive={true}
            onClick={onClickDecrement}
          />
        </Ripple>
      </div>
    </>
  );
};
