import store from '../store';

export const SET_ELAPSED = 'SET_ELAPSED';
export const setElapsed = elapsed => store.dispatch({ type: SET_ELAPSED, elapsed });
