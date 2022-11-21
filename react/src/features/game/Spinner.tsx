import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { incrementLife } from './GameSlice';
import styles from './Spinner.module.css';

type Props = {
  step: 1 | 5 | 10;
  playerIndex: number;
};
export const Spinner: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const clickIncrement = () =>
    dispatch(
      incrementLife({
        amount: props.step,
        targetPlayerIndex: props.playerIndex,
      })
    );

  const clickDecrement = () =>
    dispatch(
      incrementLife({
        amount: -props.step,
        targetPlayerIndex: props.playerIndex,
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
