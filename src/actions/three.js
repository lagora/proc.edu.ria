import store from '../store';
import * as constants from '../constants'
import * as helpers from '../helpers';

export const INIT_SCENE = 'INIT_SCENE';
export const INIT_RENDERER = 'INIT_RENDERER';
export const INIT_HELPERS = 'INIT_HELPERS';

export const initScene = () => store.dispatch({ type: INIT_SCENE });
export const initRenderer = () => store.dispatch({ type: INIT_RENDERER });
export const initHelpers = () => store.dispatch({ type: INIT_HELPERS });
