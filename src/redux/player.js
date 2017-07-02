import {merge, reducer} from '../utils';

// proceduria.js

// Initial State

const initialState = {
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    data: {
        id: 'player',
        player: true,
        position: '0 0 0',
        rotation: '0 0 0'
    }
};

// Types
const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
const SET_PLAYER_ROTATION = 'SET_PLAYER_ROTATION';
const SET_PLAYER_DATA = 'SET_PLAYER_DATA';

// Actions

export const setPlayerPosition = ({position} = initialState) => (dispatch, getState) => {
    dispatch({type: SET_PLAYER_POSITION, position});
    setPlayerData({position})(dispatch, getState);
    return Promise.resolve(position);
};
export const setPlayerRotation = (rotation = initialState.rotation) => (dispatch, getState) => {
    dispatch({type: SET_PLAYER_ROTATION, rotation});
    setPlayerData({rotation})(dispatch, getState);
    return Promise.resolve(rotation);
};
export const setPlayerData = ({position, rotation}) => (dispatch, getState) => {
    const {player} = getState();
    position = position || player.position;
    rotation = rotation || player.rotation;
    const data = {
        id: 'player',
        position: `${position.x} ${position.y} ${position.z}`,
        rotation: `${rotation.x} ${rotation.y} ${rotation.z}`
    };
    dispatch({type: SET_PLAYER_DATA, data});
}

export const actions = {
    setPlayerPosition, setPlayerRotation, setPlayerData
};

// Reducer
const reducerMapping = {
    [SET_PLAYER_POSITION]: (state, {position}) => ({...state, position}),
    [SET_PLAYER_ROTATION]: (state, {rotation}) => ({...state, rotation}),
    [SET_PLAYER_DATA]: (state, {data}) => ({...state, data: {...state.data, ...data}}),
};

export default reducer(initialState)(reducerMapping);