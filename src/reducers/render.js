import 'babel-polyfill';
import * as actions from '../actions/render';

export default function reduce(state, action) {
  if (action.type === actions.SET_RATIO) {
    const ratio = state.width / state.height;
    return { ...state, ratio };
  }

  return state;
}
