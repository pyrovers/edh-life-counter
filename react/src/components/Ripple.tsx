import React, { cloneElement, FC, ReactElement, useState } from 'react';
import styles from './Ripple.module.css';

interface Props {
  children: ReactElement;
}
export const Ripple: FC<Props> = ({ children }) => {
  const [ripple, setRipple] = useState(false);

  const spreadRipple = () => {
    setRipple(true);
    setTimeout(() => {
      setRipple(false);
    }, 500);
  };

  const rippleProps = {
    onClick: () => {
      spreadRipple();
      if (children.props.onClick) {
        children.props.onClick();
      }
    },
    className: `${children.props.className ?? ''} ${[
      styles.ripple,
      ripple ? styles.effect : '',
    ].join(' ')}`,
  };
  const childrenWithRipple = cloneElement(children, rippleProps);
  return <>{childrenWithRipple}</>;
};
