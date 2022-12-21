import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { IconButton } from '../../components/IconButton';
import { Ripple } from '../../components/Ripple';
import { incrementLife, PlayerId } from './PlayerSlice';
import styles from './Spinner.module.css';

type Props = {
  step: 1 | 5 | 10;
  playerId: PlayerId;
};
export const Spinner: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const onClickIncrement = () =>
    dispatch(
      incrementLife({
        amount: props.step,
        targetPlayerId: props.playerId,
      })
    );

  const onClickDecrement = () =>
    dispatch(
      incrementLife({
        amount: -props.step,
        targetPlayerId: props.playerId,
      })
    );

  return (
    <>
      <div className={styles.container}>
        <Ripple>
          <IconButton
            icon="caret-up"
            type="button"
            onClick={onClickIncrement}
          />
        </Ripple>
        <span className={styles.step}>{props.step}</span>
        <Ripple>
          <IconButton
            icon="caret-down"
            type="button"
            onClick={onClickDecrement}
          />
        </Ripple>
      </div>
    </>
  );
};
