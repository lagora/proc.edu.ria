import {combineReducers} from 'redux';
import playerReducer from './player';
import proceduriaReducer from './proceduria';

export const rootReducer = combineReducers({
  player: playerReducer,
  proceduria: proceduriaReducer,
});

export default rootReducer;