import { FC } from 'react';
import { CommanderDamageList, PlayerId } from '../PlayerSlice';
import { CommanderDamage } from './CommanderDamage';

import styles from './CommanderDamages.module.css';

interface Props {
  playerId: PlayerId;
  data: CommanderDamageList;
}
export const CommanderDamages: FC<Props> = ({ ...props }) => {
  return (
    <ul className={[styles.commanderDamages].join(' ')}>
      {props.data.allIds.map((opponentId) => (
        <li
          key={opponentId}
          className={styles[`${props.playerId}-${opponentId}`]}
        >
          <CommanderDamage playerId={props.playerId} opponentId={opponentId}>
            {props.data.byId[opponentId]?.damage}
          </CommanderDamage>
        </li>
      ))}
    </ul>
  );
};
