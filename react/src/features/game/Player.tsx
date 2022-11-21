import { FC } from 'react';
import {
  changeInitiativePlayer,
  changeMonarchPlayer,
  incrementCommanderDamage,
  PlayerInfo,
  selectInitiativePlayerIndex,
  selectMonarchPlayerIndex,
  toggleAscend,
} from './GameSlice';
import { Spinner } from './Spinner';
import styles from './Player.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  player: PlayerInfo;
  playerIndex: number;
};
export const Player: FC<Props> = ({ ...props }) => {
  const monarchPlayerIndex = useAppSelector(selectMonarchPlayerIndex);
  const initiativePlayerIndex = useAppSelector(selectInitiativePlayerIndex);
  const dispatch = useAppDispatch();

  const clickCommanderDamage = (
    targetPlayerIndex: number,
    opponentIndex: number
  ) => {
    dispatch(
      incrementCommanderDamage({
        amount: 1,
        opponentIndex,
        targetPlayerIndex,
      })
    );
  };

  const clickChangeMonarch = () => {
    dispatch(changeMonarchPlayer(props.playerIndex));
  };

  const clickChangeInitiative = () => {
    dispatch(changeInitiativePlayer(props.playerIndex));
  };

  const clickToggleAscend = () => {
    dispatch(toggleAscend(props.playerIndex));
  };

  return (
    <div
      className={[styles.container, `player-${props.playerIndex}`].join(' ')}
    >
      <ul className={styles.commanderDamages}>
        {props.player.commanderDamages.map(
          (damage, opponentIndex) =>
            props.playerIndex !== opponentIndex && (
              <li
                key={opponentIndex}
                onClick={() => {
                  clickCommanderDamage(props.playerIndex, opponentIndex);
                }}
              >
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
      <ul className={styles.status}>
        <li>
          <button type="button" onClick={clickChangeMonarch}>
            {`monarch: ${
              monarchPlayerIndex === props.playerIndex ? 'yes' : 'no'
            }`}
          </button>
        </li>
        <li>
          <button type="button" onClick={clickChangeInitiative}>
            {`initiative: ${
              initiativePlayerIndex === props.playerIndex ? 'yes' : 'no'
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
