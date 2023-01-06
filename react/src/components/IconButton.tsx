import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  TouchEventHandler,
} from 'react';
import styles from './IconButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

type Props = PropsWithChildren & {
  icon: IconName;
  isActive?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  onTouchStart?: TouchEventHandler<HTMLButtonElement>;
  onTouchEnd?: TouchEventHandler<HTMLButtonElement>;
};
export const IconButton: FC<Props> = ({ ...props }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      type={props.type || 'submit'}
      className={[
        props.className,
        styles.IconButton,
        props.isActive ? [styles.Active] : '',
        props.children ? [styles.WithChildren] : '',
      ].join(' ')}
      onClick={onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseLeave={props.onMouseLeave}
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
    >
      <FontAwesomeIcon className={styles.icon} icon={props.icon} />
      {props.children && (
        <span className={styles.children}>{props.children}</span>
      )}
    </button>
  );
};
