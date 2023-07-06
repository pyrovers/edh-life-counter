import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from '../global/GlobalSlice';
import playerReducer from '../player/PlayerSlice';

const gameReducer = combineReducers({
  global: globalReducer,
  players: playerReducer,
});
export default gameReducer;
