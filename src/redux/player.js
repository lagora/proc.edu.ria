import {merge, reducer} from '../utils';

// proceduria.js

// Initial State

const initialState = {
    position: {x: 0, y: 0, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    props: {
        id: 'player',
        player: true,
        position: '0 0 0',
        rotation: '0 0 0'
    }
};

// Types
const SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
const SET_PLAYER_ROTATION = 'SET_PLAYER_ROTATION';
const SET_PLAYER_PROPS = 'SET_PLAYER_PROPS';

// Actions

export const setPlayerPosition = ({position} = initialState) => (dispatch, getState) => {
    dispatch({type: SET_PLAYER_POSITION, position});
    setPlayerProps({position})(dispatch, getState);
    return Promise.resolve(position);
};
export const setPlayerRotation = (rotation = initialState.rotation) => (dispatch, getState) => {
    dispatch({type: SET_PLAYER_ROTATION, rotation});
    setPlayerProps({rotation})(dispatch, getState);
    return Promise.resolve(rotation);
};
export const setPlayerProps = ({position, rotation}) => (dispatch, getState) => {
    const {player} = getState();
    position = position || player.position;
    rotation = rotation || player.rotation;
    const props = {
        id: 'player',
        position: `${position.x} ${position.y} ${position.z}`,
        rotation: `${rotation.x} ${rotation.y} ${rotation.z}`
    };
    dispatch({type: SET_PLAYER_PROPS, props});
}

export const actions = {
    setPlayerPosition, setPlayerRotation, setPlayerProps
};

// Reducer
const reducerMapping = {
    [SET_PLAYER_POSITION]: (state, {position}) => ({...state, position}),
    [SET_PLAYER_ROTATION]: (state, {rotation}) => ({...state, rotation}),
    [SET_PLAYER_PROPS]: (state, {props}) => ({...state, props: {...state.props, ...props}}),
};

export default reducer(initialState)(reducerMapping);