import {combineReducers} from 'redux';
import districtReducer from './district';
import pillarReducer from './pillar';
import playerReducer from './player';
import proceduriaReducer from './proceduria';
import sectorReducer from './sector';
import areaReducer from './area';

export const rootReducer = combineReducers({
  district: districtReducer,
  pillar: pillarReducer,
  player: playerReducer,
  proceduria: proceduriaReducer,
  sector: sectorReducer,
  area: areaReducer,
});

export default rootReducer;