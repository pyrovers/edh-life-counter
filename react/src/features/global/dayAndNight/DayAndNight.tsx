import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeDay, changeNight, selectDayOrNight } from '../GlobalSlice';

import styles from './DayAndNight.module.css';

export const DayAndNight = () => {
  const dayOrNight = useAppSelector(selectDayOrNight);

  const dispatch = useAppDispatch();
  return (
    <fieldset className={styles.fieldset}>
      <label className={styles.toggleDay}>
        <input
          type="radio"
          name="dayOrNight"
          value="day"
          checked={dayOrNight === 'day'}
          onClick={() => dispatch(changeDay())}
          readOnly={true}
        />
        light_mode
      </label>
      <label className={styles.toggleNight}>
        <input
          type="radio"
          name="dayOrNight"
          value="night"
          checked={dayOrNight === 'night'}
          onClick={() => dispatch(changeNight())}
          readOnly={true}
        />
        dark_mode
      </label>
    </fieldset>
  );
};
