import React, { FC, useState } from 'react';
import styles from './IconButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

type Props = {
  icon: IconName;
  isActive?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: <E>(e: E) => void;
};
export const IconButton: FC<Props> = ({ ...props }) => {
  return (
    <button
      type={props.type || 'submit'}
      className={[
        styles.IconButton,
        props.isActive ? [styles.Active] : '',
      ].join(' ')}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      <FontAwesomeIcon
        className={styles.icon}
        icon={props.icon}
      ></FontAwesomeIcon>
    </button>
  );
};
