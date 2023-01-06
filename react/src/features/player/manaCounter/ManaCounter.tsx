import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IconButton } from '../../../components/IconButton';
import { Ripple } from '../../../components/Ripple';
import { useLongPress } from '../../../hooks/useLongPress';
import {
  incrementManaCount,
  PlayerId,
  resetManaCount,
  selectManaCount,
} from '../PlayerSlice';

type Props = {
  playerId: PlayerId;
};
export const ManaCounter: FC<Props> = ({ ...props }) => {
  const dispatch = useAppDispatch();

  const manaCount = useAppSelector((state) =>
    selectManaCount(state, props.playerId)
  );

  const onClickMana = () => {
    dispatch(incrementManaCount(props.playerId));
  };
  const onLongPressMana = () => {
    dispatch(resetManaCount(props.playerId));
  };
  const handleManaLongPress = useLongPress(onLongPressMana, 1000, onClickMana);

  return (
    <Ripple>
      <IconButton
        icon="hand-holding-droplet"
        type="button"
        isActive={!!manaCount}
        {...handleManaLongPress}
      >
        <>{manaCount}</>
      </IconButton>
    </Ripple>
  );
};
