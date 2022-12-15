const key = 'edh-life-counter-backup';

export const getLocalStorageValue = () => {
  const value = localStorage.getItem(key);
  if (!value) {
    return;
  }
  const parsedValue = JSON.parse(value);
  if (!validateState(parsedValue)) {
    return;
  }
  return parsedValue;
};

export const setLocalStorageValue = <T>(state: T) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const validateState = (value: any) => {
  // TODO: state の妥当性をチェックするバリデーション
  return true;
};
