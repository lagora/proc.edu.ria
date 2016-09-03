import 'babel-polyfill';
import * as actions from '../actions/render';

export default function reduce(state, action) {
  if (action.type === actions.SET_RATION) {
    return { ...state, ratio: state.width / state.height };
  }

  return state;
}
