import React, { FC, MouseEventHandler } from 'react';
import styles from './IconButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

interface Props {
  icon: IconName;
  isActive?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
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
      ].join(' ')}
      onClick={onClick}
    >
      <FontAwesomeIcon
        className={styles.icon}
        icon={props.icon}
      ></FontAwesomeIcon>
    </button>
  );
};
