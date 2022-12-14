import { createListenerMiddleware } from '@reduxjs/toolkit';

const key = 'edh-game-backup';

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

export const statePersistentMiddleware = createListenerMiddleware();
statePersistentMiddleware.startListening({
  predicate: (action, currentState, prevState) => {
    localStorage.setItem(key, JSON.stringify(currentState));
    return false;
  },
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
  },
});

const validateState = (value: any) => {
  return true;
};
