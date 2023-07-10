import { PropsWithoutRef, useContext } from 'react';
import { PlayerData } from './PlayersState';
import { Spinner } from './Spinner';
import styles from './Player.module.css';
import { IconButton } from '../../components/IconButton';
import { CommanderDamages } from './commanderDamages/CommanderDamages';
import { Ripple } from '../../components/Ripple';
import { PoisonCounter } from './poisonCounter/PoisonCounter';
import { EnergyCounter } from './energyCounter/EnergyCounter';
import { ManaCounter } from './manaCounter/ManaCounter';
import { CommanderACastCounter } from './commanderACastCounter/CommanderACastCounter';
import { CommanderBCastCounter } from './commanderBCastCounter/CommanderBCastCounter';
import { GlobalContext, GlobalDispatchContext } from '../global/GlobalProvider';
import { PlayersDispatchContext } from './PlayersProvider';

type PlayersProps = {
  player: PlayerData;
  playerCount: number;
};
export const Player = ({ ...props }: PropsWithoutRef<PlayersProps>) => {
  const { monarchPlayerId, initiativePlayerId, dayOrNight } =
    useContext(GlobalContext);
  const globalDispatch = useContext(GlobalDispatchContext);
  const playerDispatch = useContext(PlayersDispatchContext);

  const onClickChangeMonarch = () => {
    globalDispatch({
      type: 'ChangeMonarchPlayer',
      monarchPlayerId: props.player.id,
    });
  };

  const onClickChangeInitiative = () => {
    globalDispatch({
      type: 'ChangeInitiativePlayer',
      initiativePlayerId: props.player.id,
    });
  };

  const onClickToggleAscend = () => {
    playerDispatch({ type: 'ToggleAscend', targetPlayerId: props.player.id });
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
          <PoisonCounter playerId={props.player.id} />
        </li>
        <li>
          <EnergyCounter playerId={props.player.id} />
        </li>
        <li>
          <ManaCounter playerId={props.player.id} />
        </li>
        <li>
          <CommanderACastCounter playerId={props.player.id} />
        </li>
        <li>
          <CommanderBCastCounter playerId={props.player.id} />
        </li>
      </ul>
    </div>
  );
};
