import { useAppSelector } from '../../app/hooks';
import { Config } from '../config/Config';
import { PlayerData, selectPlayers } from '../player/PlayerSlice';
import { Player } from '../player/Player';
import styles from './Game.module.css';
import { Global } from '../global/Global';

export const Game = () => {
  const players = useAppSelector(selectPlayers);

  return (
    <>
      <div className={styles.configArea}>
        {players.allIds.length === 0 && <Config />}
      </div>

      {players.allIds.length !== 0 && (
        <>
          <div className={styles.playerArea}>
            {players.allIds
              .map((playerId) => players.byId[playerId] as PlayerData)
              .map((player) => (
                <Player key={player.id} player={player} />
              ))}
          </div>
          <Global />
        </>
      )}
    </>
  );
};
