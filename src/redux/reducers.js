import {combineReducers} from 'redux';
import districtReducer from './district';
import pillarReducer from './pillar';
import playerReducer from './player';
import proceduriaReducer from './proceduria';
import sectorReducer from './sector';

export const rootReducer = combineReducers({
  district: districtReducer,
  pillar: pillarReducer,
  player: playerReducer,
  proceduria: proceduriaReducer,
  sector: sectorReducer,
});

export default rootReducer;