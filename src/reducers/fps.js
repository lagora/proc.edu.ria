import 'babel-polyfill';
import * as actions from '../actions/fps';

export default function reduce(state, action) {
  if (action.type === actions.SET_ELAPSED) {
    return { ...state, elapsed : action.elapsed };
  }

  return state;
}
