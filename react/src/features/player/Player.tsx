import { FC } from 'react';
import {
  changeInitiativePlayer,
  changeMonarchPlayer,
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

type Props = {
  player: PlayerData;
};
export const Player: FC<Props> = ({ ...props }) => {
  const monarchPlayerId = useAppSelector(selectMonarchPlayerId);
  const initiativePlayerId = useAppSelector(selectInitiativePlayerId);
  const dispatch = useAppDispatch();

  const clickCommanderDamage = (
    targetPlayerId: PlayerId,
    opponentId: PlayerId
  ) => {
    dispatch(
      incrementCommanderDamage({
        amount: 1,
        opponentId,
        targetPlayerId,
      })
    );
  };

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
    <div className={[styles.container, `player-${props.player.id}`].join(' ')}>
      <ul className={styles.commanderDamages}>
        {props.player.commanderDamages.allIds.map((opponentId) => (
          <li
            key={opponentId}
            onClick={() => {
              clickCommanderDamage(props.player.id, opponentId);
            }}
          >
            <button>
              {props.player.commanderDamages.byId[opponentId]?.damage}
            </button>
          </li>
        ))}
      </ul>
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
