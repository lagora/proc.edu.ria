import {SCALES} from '../constant';
import {reducer} from '../utils';

// proceduria.js

// Initial State
const initialState = {};

// Types
const SET_PILLAR_PROPS = 'SET_PILLAR_PROPS';

// Actions
export const setPillarProps = size => (dispatch, getState) => {
    size = size || getState().proceduria;
    const scale = SCALES[0];
    const width = size * scale;
    const height = scale * 100;
    const depth = size * scale;
    const even = size % 2 === 0;
    const x = size === 1 ? (width / 2) : even ? (width / 2) : (width / 2) - (scale / 2);
    const y = ((height / 2) * -1) - (scale / 2);
    const z = size === 1 ? (depth / 2) :  even ? (depth / 2) : (depth / 2) - (scale / 2);
    const position = `${x} ${y} ${z}`;
    const props = {id: 'pillar', position, width, height, depth, x, y, z};
    dispatch({type: SET_PILLAR_PROPS, props});
};

export const actions = {setPillarProps};

// Reducer
const reducerMapping = {
    [SET_PILLAR_PROPS]: (state, {props}) => ({...state, ...props}),
};

export default reducer(initialState)(reducerMapping);