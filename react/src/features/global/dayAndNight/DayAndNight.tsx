import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './DayAndNight.module.css';
import { useContext } from 'react';
import { GlobalContext, GlobalDispatchContext } from '../GlobalProvider';

export const DayAndNight = () => {
  const { dayOrNight } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);

  const onClickDay = () => {
    dispatch({ type: 'ChangeDay' });
  };
  const onCLickNight = () => {
    dispatch({ type: 'ChangeNight' });
  };

  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.toggleDay}>
        <input
          type="radio"
          name="dayOrNight"
          value="day"
          checked={dayOrNight === 'day'}
          onClick={onClickDay}
          readOnly={true}
        />
        <FontAwesomeIcon icon="sun" />
      </label>
      <FontAwesomeIcon className={styles.arrow} icon="arrow-right-arrow-left" />
      <label className={styles.toggleNight}>
        <input
          type="radio"
          name="dayOrNight"
          value="night"
          checked={dayOrNight === 'night'}
          onClick={onCLickNight}
          readOnly={true}
        />
        <FontAwesomeIcon icon="moon" />
      </label>
    </fieldset>
  );
};
