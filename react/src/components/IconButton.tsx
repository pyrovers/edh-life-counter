import { FC, PropsWithChildren } from 'react';
import styles from './IconButton.module.css';

type Props = {
  isActive?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: <E>(e: E) => void;
};
export const IconButton: FC<PropsWithChildren<Props>> = ({ ...props }) => {
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
      {props.children}
    </button>
  );
};
