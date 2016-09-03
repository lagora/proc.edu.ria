import 'babel-polyfill';
import * as THREE from 'three';
import * as actions from '../actions/canvas';
import { initialState } from '../state';

export default function reduce(state, action) {
  if (action.type === actions.GET_CANVAS_CONTEXT_2D) {
    return {
      ...state,
      ctx: state.canvas.getContext('2d'),
      width: state.canvas.width,
      height: state.canvas.height,
    };
  }

  return state;
}
