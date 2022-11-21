import { FC } from 'react';
import { PlayerInfo } from './GameSlice';
import { Spinner } from './Spinner';
import styles from './Player.module.css';

type Props = {
  player: PlayerInfo;
  playerIndex: number;
};
export const Player: FC<Props> = ({ ...props }) => {
  return (
    <div
      className={[styles.container, `player-${props.playerIndex}`].join(' ')}
    >
      <ul className={styles.commanderDamages}>
        {props.player.commanderDamages.map(
          (damage, opponentIndex) =>
            props.playerIndex !== opponentIndex && (
              <li key={opponentIndex}>
                <button>{damage}</button>
              </li>
            )
        )}
      </ul>
      <div className={styles.lifeCounter}>
        <Spinner step={1} playerIndex={props.playerIndex} />
        <div className={styles.life}>{props.player.life}</div>
        <Spinner step={5} playerIndex={props.playerIndex} />
      </div>
    </div>
  );
};
