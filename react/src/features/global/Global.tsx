import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeDay, changeNight, selectDayOrNight } from './GlobalSlice';
import styles from './Global.module.css';

export const Global = () => {
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
              readOnly={true}
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
              readOnly={true}
            />
            night
          </label>
        </fieldset>
      </li>
    </ul>
  );
};
