import store from '../store';
import { updateLightPosition } from './lights';
import { rotateSun } from '../helpers';

export const SET_SQUARE_SIZE = 'SET_SQUARE_SIZE';
export const SET_CUBIC_SIZE = 'SET_CUBIC_SIZE';
export const MAKE_HASH_FROM_SEED = 'MAKE_HASH_FROM_SEED';
export const GENERATE_HASH_RANGE = 'GENERATE_HASH_RANGE';
export const MAKE_CITY_PILAR = 'MAKE_CITY_PILAR';
export const UPDATE_SUN_ANGLE = 'UPDATE_SUN_ANGLE';

export const setSquareSize = () => store.dispatch({ type: SET_SQUARE_SIZE });
export const setCubicSize = () => store.dispatch({ type: SET_CUBIC_SIZE });
export const makeHashFromSeed = seed => store.dispatch({ type: MAKE_HASH_FROM_SEED, seed });
export const generateHashRange = seed => store.dispatch({ type: GENERATE_HASH_RANGE });
export const makeCityPilar = () => store.dispatch({ type: MAKE_CITY_PILAR });

export const updateSunPosition = () => {
  const lightType = 'SpotLight';
  const light = state.scene.children.filter(child => {
    return child.type === lightType;
  }).map(light => light);
  if (light) {
    const { y, z } = light.position;
    const newPosition = rotateSun(0, 0, y, z, store.getState().sun.angle);
  }
}
