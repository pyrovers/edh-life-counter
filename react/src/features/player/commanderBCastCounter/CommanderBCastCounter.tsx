import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IconButton } from '../../../components/IconButton';
import { Ripple } from '../../../components/Ripple';
import { useLongPress } from '../../../hooks/useLongPress';
import {
  incrementCommanderBCastCount,
  PlayerId,
  resetCommanderBCastCount,
  selectCommanderBCastCount,
} from '../PlayerSlice';

type Props = {
  playerId: PlayerId;
};
export const CommanderBCastCounter: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const commanderBCastCount = useAppSelector((state) =>
    selectCommanderBCastCount(state, props.playerId)
  );

  const onClickCommanderB = () => {
    dispatch(incrementCommanderBCastCount(props.playerId));
  };
  const onLongPressCommanderB = () => {
    dispatch(resetCommanderBCastCount(props.playerId));
  };
  const handleCommanderBLongPress = useLongPress(
    onLongPressCommanderB,
    1000,
    onClickCommanderB
  );

  return (
    <Ripple>
      <IconButton
        icon="shield"
        type="button"
        isActive={!!commanderBCastCount}
        {...handleCommanderBLongPress}
      >
        <>{commanderBCastCount}</>
      </IconButton>
    </Ripple>
  );
};
