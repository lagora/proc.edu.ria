import store from '../store';

export const GET_CANVAS_CONTEXT_2D = 'GET_CANVAS_CONTEXT_2D';
export const getCanvasContext2d = () => store.dispatch({ type: GET_CANVAS_CONTEXT_2D });
