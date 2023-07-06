import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IconButton } from '../../../components/IconButton';
import { Ripple } from '../../../components/Ripple';
import { useLongPress } from '../../../hooks/useLongPress';
import {
  incrementPoisonCount,
  PlayerId,
  resetPoisonCount,
  selectPoisonCount,
} from '../PlayerSlice';

type Props = {
  playerId: PlayerId;
};
export const PoisonCounter: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const poisonCount = useAppSelector((state) =>
    selectPoisonCount(state, props.playerId)
  );

  const onClickPoison = () => {
    dispatch(incrementPoisonCount(props.playerId));
  };
  const onLongPressPoison = () => {
    dispatch(resetPoisonCount(props.playerId));
  };
  const handlePoisonLongPress = useLongPress(
    onLongPressPoison,
    1000,
    onClickPoison
  );

  return (
    <Ripple>
      <IconButton
        icon="skull"
        type="button"
        isActive={!!poisonCount}
        {...handlePoisonLongPress}
      >
        <>{poisonCount}</>
      </IconButton>
    </Ripple>
  );
};
