import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { incrementLife, PlayerId } from './PlayerSlice';
import styles from './Spinner.module.css';

type Props = {
  step: 1 | 5 | 10;
  playerId: PlayerId;
};
export const Spinner: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const clickIncrement = () =>
    dispatch(
      incrementLife({
        amount: props.step,
        targetPlayerId: props.playerId,
      })
    );

  const clickDecrement = () =>
    dispatch(
      incrementLife({
        amount: -props.step,
        targetPlayerId: props.playerId,
      })
    );

  return (
    <>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.increment}
          onClick={clickIncrement}
        >
          ▲
        </button>

        <span className={styles.step}>{props.step}</span>

        <button
          type="button"
          className={styles.decrement}
          onClick={clickDecrement}
        >
          ▼
        </button>
      </div>
    </>
  );
};