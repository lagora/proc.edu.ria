import {SCALES} from '../constant';
import {contain, reducer} from '../utils';

// proceduria.js

// Initial State
const initialState = {
    data: []
};

// Types
const UPDATE_SECTOR_DATA = 'UPDATE_SECTOR_DATA';

// Actions
export const updateSectorData = ({position, size}) => (dispatch, getState) => {
    const state = getState();
    size = size || state.proceduria.size;
    position = position || state.player.position;
    const scale = SCALES[1];
    const step = SCALES[0] / scale;
    const data = [];
    let i = 0;
    // for (let y = 0; y < SCALES[1]; y += step) {
    //     for (let z = 0; z < SCALES[1]; z += step) {
    //         for (let x = 0; x < SCALES[1]; x += step) {
    //             const position = {x, y, z};
    //             const id = `sector-${i}`;
    //             const width = scale;
    //             const height = scale;
    //             const depth = scale;
    //             const props = {
    //                 id, key: id,
    //                 position: `${position.x} ${position.y} ${position.z}`,
    //                 width, height, depth, material: `wireframe: true`
    //             };
    //             const block = {i, width, height, depth, x, y, z, props};
    //             data.push(block);
    //             i++;
    //         }
    //     }
    // }
    // dispatch({type: UPDATE_SECTOR_DATA, data});
};

export const actions = {updateSectorData};

// Reducer
const reducerMapping = {
    [UPDATE_SECTOR_DATA]: (state, {data}) => ({...state, data}),
};

export default reducer(initialState)(reducerMapping);