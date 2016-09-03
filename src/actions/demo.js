import store from '../store';
import * as three from './three';

export const DEMO_CUBE = 'DEMO_CUBE';
export const cube = () => store.dispatch({ type: DEMO_CUBE });
