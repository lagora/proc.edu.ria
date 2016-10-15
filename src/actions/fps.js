import store from '../store';

export const SET_ELAPSED = 'SET_ELAPSED';
export const setElapsed = elapsed => dispatch => dispatch({ type: SET_ELAPSED, elapsed });
