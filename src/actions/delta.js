import store from '../store';

export const SET_DELTA = 'SET_DELTA';
export const setDelta = delta => store.dispatch({ type: SET_DELTA, delta });
