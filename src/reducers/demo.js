import 'babel-polyfill';
import * as actions from '../actions/demo';
import * as helpers from '../helpers';

export default function reduce(state, action) {
  if (action.type === actions.DEMO_CUBE) {
    state.scene.add(helpers.cube(1));
  }

  return state;
}
