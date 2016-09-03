import 'babel-polyfill';
import * as actions from '../actions/delta';

export default function reduce(state, action) {
  if (action.type === actions.SET_DELTA) {
    return { ...state, delta : action.delta };
  }

  return state;
}
