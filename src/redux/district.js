import {SCALES} from '../constant';
import {getPlayerPositionByScale, mkBlock, mkId, reducer} from '../utils';

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
    let blockPosition = getPlayerPositionByScale(true)(scale)(position);
    blockPosition.x = (blockPosition.x * blockPosition.scale);
    blockPosition.y = (blockPosition.y * blockPosition.scale);
    blockPosition.z = (blockPosition.z * blockPosition.scale);
    const id = mkId('district')(blockPosition);
    // console.info('updateDistrictData', 'blockPosition', blockPosition);

    const data = [mkBlock(blockPosition, 'side: back', id)];
    dispatch({type: UPDATE_DISTRICT_DATA, data});
    return Promise.resolve(data);
};

export const actions = {updateDistrictData};

// Reducer
const reducerMapping = {
    [UPDATE_DISTRICT_DATA]: (state, {data}) => ({...state, data}),
};

export default reducer(initialState)(reducerMapping);