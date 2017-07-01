import {merge, reducer} from '../utils';

// proceduria.js

// Initial State

const initialState = {
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
};

// Types
const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
const SET_PLAYER_ROTATION = 'SET_PLAYER_ROTATION';

export const types = {
    SET_PLAYER_POSITION, SET_PLAYER_ROTATION
};

// Actions

export const setPlayerPosition = (position = initialState.position) => dispatch => dispatch({type: SET_PLAYER_POSITION, position}) && Promise.resolve(position);
export const setPlayerRotation = (rotation = initialState.rotation) => dispatch => dispatch({type: SET_PLAYER_ROTATION, rotation}) && Promise.resolve(rotation);

export const actions = {
    setPlayerPosition, setPlayerRotation
};

// Reducer
const reducerMapping = {
    [SET_PLAYER_POSITION]: (state, {position}) => ({...state, position}),
    [SET_PLAYER_ROTATION]: (state, {rotation}) => ({...state, rotation}),
};

export default reducer(initialState)(reducerMapping);