import * as actions from '../actions';
import * as helpers from '../helpers';

export default function reduce(state, action) {
  if (action.type === actions.SET_CUBIC_SIZE) {
    const cubicSize = Math.pow(+state.size, 3);
    return { ...state, cubicSize };
  } else if (action.type === actions.SET_SQUARE_SIZE) {
    const squareSize = Math.pow(+state.size, 2);
    return { ...state, squareSize };
  } else if (action.type === actions.MAKE_HASH_FROM_SEED) {
    return { ...state, hash: helpers.hashPadding(action.seed, state.squareSize) };
  } else if (action.type === actions.GENERATE_HASH_RANGE) {
    const hashRange = [];
    for (let i = 0; i < state.hash.length; i++) {
      if (hashRange.length === state.hash.length) {
        break;
      } else if (hashRange.indexOf(state.hash[i]) === -1) {
        hashRange.push(state.hash[i]);
      }
    }
    return { ...state, hashRange: hashRange.sort() };
  }

  return state;
}
