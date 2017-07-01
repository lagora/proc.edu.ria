import md5 from 'spark-md5';
import {AXES, DEFAULT_SEED, SCALES} from '../constant';
import {getHash, makeHashes, merge, reducer} from '../utils';

// proceduria.js

// Initial State

const initialState = {
    data: [],
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
    mixins: [],
};

// Types
const SET_SEED = 'SET_SEED';
const SET_SIZE = 'SET_SIZE';
const SET_MIXINS = 'SET_MIXINS';
const HASH_FROM_SEED = 'HASH_FROM_SEED';
const SET_PILLAR_PROPS = 'SET_PILLAR_PROPS';
const SET_CITY_BLOCKS = 'SET_CITY_BLOCKS';
export const types = {
    SET_SEED, SET_SIZE, HASH_FROM_SEED, SET_CITY_BLOCKS
};

// Actions

export const setSeed = (seed = DEFAULT_SEED) => dispatch => dispatch({type: SET_SEED, seed}) && Promise.resolve(seed);// hashFromSeed(seed)(dispatch);
export const setSize = (size = 1) => dispatch => dispatch({type: SET_SIZE, size}) && Promise.resolve(size);
export const hashFromSeed = seed => dispatch => {
    const hash = {...makeHashes(AXES)(md5.hash(seed))(md5.hash), value: md5.hash(seed)}
    dispatch({type: HASH_FROM_SEED, hash});
    return Promise.resolve(hash);
};

export const setPillarProps = size => (dispatch, getState) => {
    size = size || getState().proceduria;
    const scale = SCALES[0];
    const height = scale * 100;
    const y = ((height / 2) * -1) - (scale / 2);
    const position = `0 ${y} 0`;
    const pillar = {id: 'pillar', position, width: scale, height, depth: scale};
    dispatch({type: SET_PILLAR_PROPS, pillar});
};

export const setMixins = hash => (dispatch, getState) => {
    hash = hash || getState().proceduria;
    console.info('setMixins', hash);

    const mixins = [];
    SCALES.map((scale, scaleIndex) => {
        const step = scale / 10;
        for (let i = 0; i < 15; i++) {
            const hex = i.toString(16);
            mixins.push({
                id: `scale-${scale}-hex-${hex}`
            });
        }
    });
    dispatch({type: SET_MIXINS, mixins});
};

export const setCityBlocks = hash => (dispatch, getState) => {
    hash = hash || getState().proceduria;
    console.info('setCityBlocks', hash);

    let i = 0;
    const blocks = [];
    SCALES.slice(0, SCALES.length - 1).map((scale, scaleIndex) => {
        const step = scale / 10;
        for (let index = 0; index < 15; index++) {
            console.info('index', index, index.toString(16))
        }
        // for (let y = 0; y < scale; y += step) {
        //     for (let z = 0; z < scale; z += step) {
        //         for (let x = 0; x < scale; x += step) {
        //             const hex = {
        //                 value: getHash(hash.value)(i),
        //                 x: {offset: getHash(hash.x.offset)(i), size: getHash(hash.x.size)(i)},
        //                 y: {offset: getHash(hash.y.offset)(i), size: getHash(hash.y.size)(i)},
        //                 z: {offset: getHash(hash.z.offset)(i), size: getHash(hash.z.size)(i)}
        //             };
        //             const position = `${x} ${y} ${z}`;
        //             const block = {i, hex, position, x, y, z};
        //             blocks.push(block);
        //             i++;
        //         }
        //     }
        // }
    });
    // console.info('addCityBlock', blocks[0]);
    // dispatch({type: SET_CITY_BLOCKS, blocks});
};

export const actions = {
    setSeed, setSize, setPillarProps, hashFromSeed, setMixins, setCityBlocks
};

// Reducer
const reducerMapping = {
    [SET_SEED]: (state, {type, seed}) => ({...state, seed}),
    [SET_SIZE]: (state, {size}) => ({...state, size}),
    [SET_MIXINS]: (state, {mixins}) => ({...state, mixins}),
    [HASH_FROM_SEED]: (state, {hash}) => ({...state, hash}),
    [SET_PILLAR_PROPS]: (state, {pillar}) => ({...state, props: {...state.props, pillar}}),
    [SET_CITY_BLOCKS]: (state, {blocks}) => ({...state, data: [...state.data, blocks]})
};

export default reducer(initialState)(reducerMapping);