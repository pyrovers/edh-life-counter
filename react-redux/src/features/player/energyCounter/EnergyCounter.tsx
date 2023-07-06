import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IconButton } from '../../../components/IconButton';
import { Ripple } from '../../../components/Ripple';
import { useLongPress } from '../../../hooks/useLongPress';
import {
  incrementEnergyCount,
  PlayerId,
  resetEnergyCount,
  selectEnergyCount,
} from '../PlayerSlice';

type Props = {
  playerId: PlayerId;
};
export const EnergyCounter: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const energyCount = useAppSelector((state) =>
    selectEnergyCount(state, props.playerId)
  );

  const onClickEnergy = () => {
    dispatch(incrementEnergyCount(props.playerId));
  };
  const onLongPressEnergy = () => {
    dispatch(resetEnergyCount(props.playerId));
  };
  const handleEnergyLongPress = useLongPress(
    onLongPressEnergy,
    1000,
    onClickEnergy
  );

  return (
    <Ripple>
      <IconButton
        icon="bolt"
        type="button"
        isActive={!!energyCount}
        {...handleEnergyLongPress}
      >
        <>{energyCount}</>
      </IconButton>
    </Ripple>
  );
};
