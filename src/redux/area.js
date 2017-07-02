import {AXES, SCALES} from '../constant';
import {getPlayerPositionByScale, mkBlock, mkId, reducer} from '../utils';

// proceduria.js

// Initial State
const initialState = {
    data: []
};

// Types
const UPDATE_AREA_DATA = 'UPDATE_AREA_DATA';

// Actions
export const updateAreaData = ({position}) => (dispatch, getState) => {
    const state = getState();
    const {player} = state;
    const scale = SCALES[2];
    const half = scale / 2;
    let blockPosition = getPlayerPositionByScale(true)(scale)({x: position.x + half, y: position.y + half, z: position.z + half});
    blockPosition.x = (blockPosition.x * scale) - half;
    blockPosition.y = (blockPosition.y * scale) - half;
    blockPosition.z = (blockPosition.z * scale) - half;
    const id = mkId('area')(blockPosition);
    // console.info('updateAreaData', 'blockPosition', blockPosition);

    const data = [mkBlock(blockPosition, 'side: double', id)];
    dispatch({type: UPDATE_AREA_DATA, data});
    return Promise.resolve(data);
};

export const actions = {updateAreaData};

// Reducer
const reducerMapping = {
    [UPDATE_AREA_DATA]: (state, {data}) => ({...state, data}),
};

export default reducer(initialState)(reducerMapping);