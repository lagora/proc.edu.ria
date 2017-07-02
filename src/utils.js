import * as constants from './constant';

export const contain = containee => container => {
    const {width, height, depth} = container;
    const map = {
        x: width / 2,
        y: height / 2,
        z: depth / 2
    };
    return constants.AXES.every(axis => {
        return container.x - map[axis] <= containee.x && containee.x <= container.x + map[axis];
    });
};

export const getHash = hash => i => i < hash.length ? hash[i] : hash[i % hash.length];

export const makeHashes = axes => hash => f => axes.map(axis => ({[axis]: {offset: f(`[${axis}].offset:${hash}`), size: f(`${axis}.size:${hash}`)}})).reduce(merge, {});

export const merge = (a, b) => ({...a, ...b});

export const reducer = initialState => mapping => (state = initialState, action) => {
    if (action && action.type && mapping[action.type]) {
        return mapping[action.type](state, action);
    }
    return state;
};