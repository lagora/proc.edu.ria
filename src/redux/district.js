import {SCALES} from '../constant';
import {contain, reducer} from '../utils';

// proceduria.js

// Initial State
const initialState = {
    data: []
};

// Types
const UPDATE_DISTRICT_DATA = 'UPDATE_DISTRICT_DATA';

// Actions
export const updateDistrictData = ({position, size}) => (dispatch, getState) => {
    const state = getState();
    size = size || state.proceduria.size;
    position = position || state.player.position;
    const scale = SCALES[0];
    const data = [];
    let i = 0;
    for (let y = 0; y < size * scale; y += scale) {
        for (let z = 0; z < size * scale; z += scale) {
            for (let x = 0; x < size * scale; x += scale) {
                const position = {x, y, z};
                const id = `district-${i}`;
                const width = scale;
                const height = scale;
                const depth = scale;
                const props = {
                    id, key: id,
                    position: `${position.x} ${position.y} ${position.z}`,
                    width, height, depth, material: `wireframe: true`
                };
                const block = {i, width, height, depth, x, y, z, props};
                data.push(block);
                i++;
            }
        }
    }
    dispatch({type: UPDATE_DISTRICT_DATA, data});
};

export const actions = {updateDistrictData};

// Reducer
const reducerMapping = {
    [UPDATE_DISTRICT_DATA]: (state, {data}) => ({...state, data}),
};

export default reducer(initialState)(reducerMapping);