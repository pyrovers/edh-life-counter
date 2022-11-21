import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeDay, changeNight, selectDayOrNight } from './GameSlice';
import styles from './GlobalStatus.module.css';

export const GlobalStatus = () => {
  const dayOrNight = useAppSelector(selectDayOrNight);

  const dispatch = useAppDispatch();

  return (
    <ul className={styles.globalStatus}>
      <li>
        <fieldset>
          <label>
            <input
              type="radio"
              name="dayOrNight"
              value="day"
              checked={dayOrNight === 'day'}
              onClick={() => dispatch(changeDay())}
            />
            day
          </label>
          <label>
            <input
              type="radio"
              name="dayOrNight"
              value="night"
              checked={dayOrNight === 'night'}
              onClick={() => dispatch(changeNight())}
            />
            night
          </label>
        </fieldset>
      </li>
    </ul>
  );
};
