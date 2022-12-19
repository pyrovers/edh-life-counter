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
        <IconButton type="button" onClick={clickIncrement}>
          keyboard_arrow_up
        </IconButton>

        <span className={styles.step}>{props.step}</span>

        <IconButton type="button" onClick={clickDecrement}>
          keyboard_arrow_down
        </IconButton>
      </div>
    </>
  );
};
