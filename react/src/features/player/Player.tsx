import { FC } from 'react';
import {
  changeInitiativePlayer,
  changeMonarchPlayer,
  selectDayOrNight,
  selectInitiativePlayerId,
  selectMonarchPlayerId,
} from '../global/GlobalSlice';
import {
  incrementCommanderACastCount,
  incrementCommanderBCastCount,
  incrementEnergyCount,
  incrementManaCount,
  incrementPoisonCount,
  PlayerData,
  resetCommanderACastCount,
  resetCommanderBCastCount,
  resetEnergyCount,
  resetManaCount,
  resetPoisonCount,
  toggleAscend,
} from './PlayerSlice';
import { Spinner } from './Spinner';
import styles from './Player.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IconButton } from '../../components/IconButton';
import { CommanderDamages } from './commanderDamages/CommanderDamages';
import { Ripple } from '../../components/Ripple';
import { useLongPress } from '../../hooks/useLongPress';

type Props = {
  player: PlayerData;
  playerCount: number;
};
export const Player: FC<Props> = ({ ...props }) => {
  const monarchPlayerId = useAppSelector(selectMonarchPlayerId);
  const initiativePlayerId = useAppSelector(selectInitiativePlayerId);
  const dayOrNight = useAppSelector(selectDayOrNight);
  const dispatch = useAppDispatch();

  const onClickChangeMonarch = () => {
    dispatch(changeMonarchPlayer(props.player.id));
  };

  const onClickChangeInitiative = () => {
    dispatch(changeInitiativePlayer(props.player.id));
  };

  const onClickToggleAscend = () => {
    dispatch(toggleAscend(props.player.id));
  };

  const onClickPoison = () => {
    dispatch(incrementPoisonCount(props.player.id));
  };
  const onLongPressPoison = () => {
    dispatch(resetPoisonCount(props.player.id));
  };
  const handlePoisonLongPress = useLongPress(
    onLongPressPoison,
    1000,
    onClickPoison
  );

  const onClickMana = () => {
    dispatch(incrementManaCount(props.player.id));
  };
  const onLongPressMana = () => {
    dispatch(resetManaCount(props.player.id));
  };
  const handleManaLongPress = useLongPress(onLongPressMana, 1000, onClickMana);

  const onClickEnergy = () => {
    dispatch(incrementEnergyCount(props.player.id));
  };
  const onLongPressEnergy = () => {
    dispatch(resetEnergyCount(props.player.id));
  };
  const handleEnergyLongPress = useLongPress(
    onLongPressEnergy,
    1000,
    onClickEnergy
  );

  const onClickCommanderA = () => {
    dispatch(incrementCommanderACastCount(props.player.id));
  };
  const onLongPressCommanderA = () => {
    dispatch(resetCommanderACastCount(props.player.id));
  };
  const handleCommanderALongPress = useLongPress(
    onLongPressCommanderA,
    1000,
    onClickCommanderA
  );

  const onClickCommanderB = () => {
    dispatch(incrementCommanderBCastCount(props.player.id));
  };
  const onLongPressCommanderB = () => {
    dispatch(resetCommanderBCastCount(props.player.id));
  };
  const handleCommanderBLongPress = useLongPress(
    onLongPressCommanderB,
    1000,
    onClickCommanderB
  );

  return (
    <div
      className={[
        styles.container,
        styles[props.player.id],
        styles[`${props.player.id}-${props.playerCount}`],
        dayOrNight === 'night' ? styles.night : '',
      ].join(' ')}
    >
      <CommanderDamages
        playerId={props.player.id}
        data={props.player.commanderDamages}
      />
      <div className={styles.lifeCounter}>
        <Spinner step={1} playerId={props.player.id} />
        <div className={styles.life}>{props.player.life}</div>
        <Spinner step={5} playerId={props.player.id} />
      </div>
      <ul className={styles.status}>
        <li>
          <Ripple>
            <IconButton
              icon="scroll"
              type="button"
              isActive={initiativePlayerId === props.player.id}
              onClick={onClickChangeInitiative}
            />
          </Ripple>
        </li>
        <li>
          <Ripple>
            <IconButton
              icon="crown"
              type="button"
              isActive={monarchPlayerId === props.player.id}
              onClick={onClickChangeMonarch}
            />
          </Ripple>
        </li>
        <li>
          <Ripple>
            <IconButton
              icon="medal"
              type="button"
              isActive={props.player.isAscend}
              onClick={onClickToggleAscend}
            >
              10+
            </IconButton>
          </Ripple>
        </li>
      </ul>
      <ul className={styles.status}>
        <li>
          <Ripple>
            <IconButton
              icon="skull"
              type="button"
              isActive={!!props.player.poisonCount}
              {...handlePoisonLongPress}
            >
              <>{props.player.poisonCount}</>
            </IconButton>
          </Ripple>
        </li>
        <li>
          <Ripple>
            <IconButton
              icon="bolt"
              type="button"
              isActive={!!props.player.energyCount}
              {...handleEnergyLongPress}
            >
              <>{props.player.energyCount}</>
            </IconButton>
          </Ripple>
        </li>
        <li>
          <Ripple>
            <IconButton
              icon="hand-holding-droplet"
              type="button"
              isActive={!!props.player.manaCount}
              {...handleManaLongPress}
            >
              <>{props.player.manaCount}</>
            </IconButton>
          </Ripple>
        </li>
        <li>
          <Ripple>
            <IconButton
              icon="shield"
              type="button"
              isActive={!!props.player.commanderACastCount}
              {...handleCommanderALongPress}
            >
              <>{props.player.commanderACastCount}</>
            </IconButton>
          </Ripple>
        </li>
        <li>
          <Ripple>
            <IconButton
              icon="shield-halved"
              type="button"
              isActive={!!props.player.commanderBCastCount}
              {...handleCommanderBLongPress}
            >
              <>{props.player.commanderBCastCount}</>
            </IconButton>
          </Ripple>
        </li>
      </ul>
    </div>
  );
};
