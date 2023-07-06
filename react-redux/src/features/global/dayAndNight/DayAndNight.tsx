import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeDay, changeNight, selectDayOrNight } from '../GlobalSlice';

import styles from './DayAndNight.module.css';

export const DayAndNight = () => {
  const dayOrNight = useAppSelector(selectDayOrNight);

  const onClickDay = () => {
    dispatch(changeDay());
  };
  const onCLickNight = () => {
    dispatch(changeNight());
  };

  const dispatch = useAppDispatch();
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
