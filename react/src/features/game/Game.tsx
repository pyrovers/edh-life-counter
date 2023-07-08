import { useAppSelector } from '../../app/hooks';
import { Config } from '../config/Config';
import { PlayerData, selectPlayers } from '../player/PlayerSlice';
import { Player } from '../player/Player';
import styles from './Game.module.css';
import { Global } from '../global/Global';
import { GlobalProvider } from '../global/GlobalProvider';

export const Game = () => {
  const players = useAppSelector(selectPlayers);

  return (
    <>
      <GlobalProvider>
        {players.allIds.length === 0 && (
          <div className={styles.configArea}>
            <Config />
          </div>
        )}

        {players.allIds.length !== 0 && (
          <>
            <div className={styles.playerArea}>
              {players.allIds
                .map((playerId) => players.byId[playerId] as PlayerData)
                .map((player) => (
                  <Player
                    key={player.id}
                    player={player}
                    playerCount={players.allIds.length}
                  />
                ))}
            </div>
            <div className={styles.globalArea}>
              <Global />
            </div>
          </>
        )}
      </GlobalProvider>
    </>
  );
};
