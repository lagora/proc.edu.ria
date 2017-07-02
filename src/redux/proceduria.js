import md5 from 'spark-md5';
import {AXES, DEFAULT_SEED, SCALES} from '../constant';
import {getHash, makeHashes, merge, reducer} from '../utils';

// proceduria.js

// Initial State

const initialState = {
    hash: {
        value: undefined,
        x: {
            offset: undefined,
            size: undefined
        },
        y: {
            offset: undefined,
            size: undefined
        },
        z: {
            offset: undefined,
            size: undefined
        }
    },
    props: {},
    seed: undefined,
    size: undefined,
};

// Types
const SET_SEED = 'SET_SEED';
const SET_SIZE = 'SET_SIZE';
const HASH_FROM_SEED = 'HASH_FROM_SEED';

// Actions

export const setSeed = (seed = DEFAULT_SEED) => dispatch => dispatch({type: SET_SEED, seed}) && Promise.resolve(seed);// hashFromSeed(seed)(dispatch);
export const setSize = (size = 1) => dispatch => dispatch({type: SET_SIZE, size}) && Promise.resolve(size);
export const hashFromSeed = seed => dispatch => {
    const hash = {...makeHashes(AXES)(md5.hash(seed))(md5.hash), value: md5.hash(seed)}
    dispatch({type: HASH_FROM_SEED, hash});
    return Promise.resolve(hash);
};

export const actions = {
    setSeed, setSize, hashFromSeed
};

// Reducer
const reducerMapping = {
    [SET_SEED]: (state, {type, seed}) => ({...state, seed}),
    [SET_SIZE]: (state, {size}) => ({...state, size}),
    [HASH_FROM_SEED]: (state, {hash}) => ({...state, hash}),
};

export default reducer(initialState)(reducerMapping);