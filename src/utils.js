export const getHash = hash => i => i < hash.length ? hash[i] : hash[i % hash.length];

export const makeHashes = axes => hash => f => axes.map(axis => ({[axis]: {offset: f(`[${axis}].offset:${hash}`), size: f(`${axis}.size:${hash}`)}})).reduce(merge, {});

export const merge = (a, b) => ({...a, ...b});

export const reducer = initialState => mapping => (state = initialState, action) => {
    if (action && action.type && mapping[action.type]) {
        return mapping[action.type](state, action);
    }
    return state;
};