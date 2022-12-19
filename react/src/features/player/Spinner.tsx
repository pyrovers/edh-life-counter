import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { IconButton } from '../../components/IconButton';
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
        <div>
          <IconButton icon="caret-up" type="button" onClick={clickIncrement} />
        </div>
        <span className={styles.step}>{props.step}</span>
        <div>
          <IconButton
            icon="caret-down"
            type="button"
            onClick={clickDecrement}
          />
        </div>
      </div>
    </>
  );
};
