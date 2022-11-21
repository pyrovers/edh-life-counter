import { useAppSelector } from '../../app/hooks';
import { Config } from '../config/Config';
import { selectPlayers } from './GameSlice';
import { Player } from './Player';
import styles from './Game.module.css';
import { GlobalStatus } from './GlobalStatus';

export const Game = () => {
  const players = useAppSelector(selectPlayers);

  return (
    <>
      <div className={styles.configArea}>
        {players.length === 0 && <Config />}
      </div>

      {players.length !== 0 && (
        <>
          <div className={styles.playerArea}>
            {players.map((player, playerIndex) => (
              <Player
                key={playerIndex}
                player={player}
                playerIndex={playerIndex}
              />
            ))}
          </div>
          <GlobalStatus />
        </>
      )}
    </>
  );
};
