import { FC } from 'react';
import {
  changeInitiativePlayer,
  changeMonarchPlayer,
  selectDayOrNight,
  selectInitiativePlayerId,
  selectMonarchPlayerId,
} from '../global/GlobalSlice';
import { PlayerData, toggleAscend } from './PlayerSlice';
import { Spinner } from './Spinner';
import styles from './Player.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IconButton } from '../../components/IconButton';
import { CommanderDamages } from './commanderDamages/CommanderDamages';

type Props = {
  player: PlayerData;
  playerCount: number;
};
export const Player: FC<Props> = ({ ...props }) => {
  const monarchPlayerId = useAppSelector(selectMonarchPlayerId);
  const initiativePlayerId = useAppSelector(selectInitiativePlayerId);
  const dayOrNight = useAppSelector(selectDayOrNight);
  const dispatch = useAppDispatch();

  const clickChangeMonarch = () => {
    dispatch(changeMonarchPlayer(props.player.id));
  };

  const clickChangeInitiative = () => {
    dispatch(changeInitiativePlayer(props.player.id));
  };

  const clickToggleAscend = () => {
    dispatch(toggleAscend(props.player.id));
  };

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
          <IconButton
            icon="scroll"
            type="button"
            isActive={initiativePlayerId === props.player.id}
            onClick={clickChangeInitiative}
          />
        </li>
        <li>
          <IconButton
            icon="crown"
            type="button"
            isActive={monarchPlayerId === props.player.id}
            onClick={clickChangeMonarch}
          />
        </li>
        <li>
          <IconButton
            icon="people-line"
            type="button"
            isActive={props.player.isAscend}
            onClick={clickToggleAscend}
          />
        </li>
      </ul>
    </div>
  );
};
