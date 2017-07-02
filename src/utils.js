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

export const getPlayerPositionByScale = center => scale => position => {
    return constants.AXES.map(axis => {
        return {scale, [axis]: Math.round((position[axis] / scale) - (center ? 0 : (scale / 2))) };
    }).reduce(merge, {});
};

export const getHash = hash => i => i < hash.length ? hash[i] : hash[i % hash.length];

export const makeHashes = axes => hash => f => axes.map(axis => ({[axis]: {offset: f(`[${axis}].offset:${hash}`), size: f(`${axis}.size:${hash}`)}})).reduce(merge, {});

export const mkBlock = ({x, y, z, scale}, material = {wireframe: true}, id) => {
    const position = `${x} ${y} ${z}`;
    const width = scale;
    const height = scale;
    const depth = scale;
    const props = {id, key: id, position, width, height, depth, material};
    return {id, props, scale, x, y, z};
};

export const mkId = prefix => ({scale, x, y, z}) => `${prefix}-${x.toString(16)}${y.toString(16)}${z.toString(16)}`;

export const merge = (a, b) => ({...a, ...b});

export const reducer = initialState => mapping => (state = initialState, action) => {
    if (action && action.type && mapping[action.type]) {
        return mapping[action.type](state, action);
    }
    return state;
};