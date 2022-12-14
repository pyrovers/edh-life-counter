import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { initializeGlobal } from '../global/GlobalSlice';
import { initializePlayers } from '../player/PlayerSlice';
import {
  selectInitialLife,
  selectPlayerCount,
  setInitialLife,
  setPlayerCount,
} from './ConfigSlice';

export function Config() {
  const dispatch = useAppDispatch();
  const playerCount = useAppSelector(selectPlayerCount);
  const initialLife = useAppSelector(selectInitialLife);

  const changePlayerCount = (playerCountText: string) => {
    const playerCount = Number(playerCountText);
    if (playerCount <= 0) {
      return;
    }
    dispatch(setPlayerCount(playerCount));
  };

  const changeInitialLife = (lifeText: string) => {
    const life = Number(lifeText);
    if (life <= 0) {
      return;
    }
    dispatch(setInitialLife(life));
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(initializeGlobal({}));
    dispatch(initializePlayers());
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="playerCount">Player Count</label>
          <input
            type="number"
            name="playerCount"
            min="2"
            max="4"
            value={playerCount}
            onChange={(e) => changePlayerCount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="initialLife">Default Life</label>
          <input
            type="number"
            name="initialLife"
            value={initialLife}
            min="20"
            max="100"
            step="10"
            onChange={(e) => changeInitialLife(e.target.value)}
          />
        </div>
        <button type="submit">OK</button>
      </form>
    </>
  );
}
