import { useEffect, useState } from 'react';

export const useLongPress = (
  callback: () => void,
  thresholdMilliSecond: number,
  onClick?: () => void
) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const [isEffectedLongPress, setIsEffectedLongPress] = useState(false);

  let timeout: NodeJS.Timeout | undefined;

  useEffect(() => {
    if (isLongPress) {
      callback();
      setIsLongPress(false);
      setIsEffectedLongPress(true);
    }
  }, [isLongPress]);

  const start = () => {
    timeout = setTimeout(() => {
      setIsLongPress(true);
    }, thresholdMilliSecond);
  };

  const stop = () => {
    clearTimeout(timeout);
  };

  const click = () => {
    if (onClick && !isEffectedLongPress) {
      onClick();
    }
    setIsEffectedLongPress(false);
  };

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchEnd: stop,
    onClick: click,
  };
};
