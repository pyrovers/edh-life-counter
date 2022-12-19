import { FC } from 'react';
import {
  changeInitiativePlayer,
  changeMonarchPlayer,
  selectDayOrNight,
  selectInitiativePlayerId,
  selectMonarchPlayerId,
} from '../global/GlobalSlice';
import {
  incrementCommanderDamage,
  PlayerId,
  PlayerData,
  toggleAscend,
} from './PlayerSlice';
import { Spinner } from './Spinner';
import styles from './Player.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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
          <button type="button" onClick={clickChangeMonarch}>
            {`monarch: ${monarchPlayerId === props.player.id ? 'yes' : 'no'}`}
          </button>
        </li>
        <li>
          <button type="button" onClick={clickChangeInitiative}>
            {`initiative: ${
              initiativePlayerId === props.player.id ? 'yes' : 'no'
            }`}
          </button>
        </li>
        <li>
          <button type="button" onClick={clickToggleAscend}>
            {`ascend: ${props.player.isAscend ? 'yes' : 'no'}`}
          </button>
        </li>
      </ul>
    </div>
  );
};
