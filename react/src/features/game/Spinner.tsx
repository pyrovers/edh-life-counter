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

  return (
    <>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.increment}
          onClick={() =>
            dispatch(
              incrementLife({
                amount: props.step,
                targetPlayerIndex: props.playerIndex,
              })
            )
          }
        >
          ▲
        </button>

        <span className={styles.step}>{props.step}</span>

        <button
          type="button"
          className={styles.decrement}
          onClick={() =>
            dispatch(
              incrementLife({
                amount: -props.step,
                targetPlayerIndex: props.playerIndex,
              })
            )
          }
        >
          ▼
        </button>
      </div>
    </>
  );
};
