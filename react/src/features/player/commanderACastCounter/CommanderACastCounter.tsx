import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IconButton } from '../../../components/IconButton';
import { Ripple } from '../../../components/Ripple';
import { useLongPress } from '../../../hooks/useLongPress';
import {
  incrementCommanderACastCount,
  PlayerId,
  resetCommanderACastCount,
  selectCommanderACastCount,
} from '../PlayerSlice';

type Props = {
  playerId: PlayerId;
};
export const CommanderACastCounter: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const commanderACastCount = useAppSelector((state) =>
    selectCommanderACastCount(state, props.playerId)
  );

  const onClickCommanderA = () => {
    dispatch(incrementCommanderACastCount(props.playerId));
  };
  const onLongPressCommanderA = () => {
    dispatch(resetCommanderACastCount(props.playerId));
  };
  const handleCommanderALongPress = useLongPress(
    onLongPressCommanderA,
    1000,
    onClickCommanderA
  );

  return (
    <Ripple>
      <IconButton
        icon="shield"
        type="button"
        isActive={!!commanderACastCount}
        {...handleCommanderALongPress}
      >
        <>{commanderACastCount}</>
      </IconButton>
    </Ripple>
  );
};
