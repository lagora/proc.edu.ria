import SIMD from 'simd';
import * as constants from './constant';
import md5 from 'spark-md5';
// import district from '../../../../../../Users/Lagora/dev/proc.edu.ria/src/redux/district';

export const addDimensions = a => b => ({...b, ...constants.AXES.map(axis => ({[axis]: a[axis] + b[axis]})).reduce(merge, {})});

export const addHex = hash => (a, i) => ({...a, i, hex: getHash(hash)(i)});

export const adjustYAsHalfHeight = a => ({...a, y : a.y + (a.height / 2)});

export const alignToGround = a => a && ({...a, y: a.y * a.scale});

export const alignAXES = axes => a => a && axes.length && ({...a, ...axes.map(k => ({[k]: (a[k] * a.scale) + (a.scale / 2)}))})

// export const alignY = a => a && ({...a, y: (a.y * a.scale) + (a.scale / 2)});
export const alignY = a => alignAXES(['y'])(a);// a && ({...a, y: (a.y * a.scale) + (a.scale / 2)});

// export const alignXZ = step => a => a && ({...a, x: (a.x * step.x) + (a. / 2), z: (a.z * a.scale) + (a.scale / 2)});
export const alignXZ = a => alignAXES(['x', 'z'])(a);//a && ({...a, x: (a.x * a.scale) + (a.scale / 2), z: (a.z * a.scale) + (a.scale / 2)});

export const concat = (a, b) => a.concat(b);

export const contain = containee => container => {
    const {width, height, depth, scale} = container;
    const map = {
        x: (width ? width : scale) / 2,
        y: (height ? height : scale) / 2,
        z: (depth ? depth : scale) / 2
    };
    const result = constants.AXES.every(axis => {
        const r = container[axis] - map[axis] <= containee[axis] && containee[axis] <= container[axis] + map[axis];
        console.info(axis, r, containee, container)
        return r;
    });
    return result;
};

export const dimension = a => ({...a, width: a.scale, height: a.scale, depth: a.scale});

export const distance = a => b => {
    if (typeof a === 'number' && typeof b === 'number') {
        return Math.pow(a < b ? b - a : a > b ? a - b : 0, 2);
    } else {
        const x = distance(a.x)(b.x);
        const y = distance(a.y)(b.y);
        const z = distance(a.z)(b.z);
        return Math.sqrt(Math.hypot(x, y, z));
    }
};

export const encapsulate = key => data => ({[key]: data});

export const filterY = axis => axis !== 'y';

export const getPlayerPositionByScale = center => scale => position => {
    return constants.AXES.map(axis => {
        return {scale, [axis]: Math.round((position[axis] / scale) - (center ? 0 : (scale / 2))) };
    }).reduce(merge, {});
};

export const getHash = hash => i => i < hash.length ? hash[i] : hash[i % hash.length];

export const heightFromHex = (coef = 0.5) => a => ({...a, height: (a.height * parseInt(a.hex, 16) * coef) });

export const makeHashes = axes => hash => f => axes.map(axis => ({[axis]: {offset: f(`[${axis}].offset:${hash}`), size: f(`${axis}.size:${hash}`)}})).reduce(merge, {});

export const mkBlock = (a, material = {wireframe: true}) => {
    const {id, x, y, z, scale} = a;
    const position = `${x} ${y} ${z}`;
    const width = a.width || scale;
    const height = a.height || scale;
    const depth = a.depth || scale;
    const props = a && {id, key: id, position, width, height, depth, material};
    return a && {i: a.i, id, props, scale, x, y, z, sub: a.sub || []};
};

export const divideByTen = a => constants.AXES.map(axis => ({[axis]: a[axis] / 10})).reduce(merge, {});

export const mapHex = hash => list => list.map(addHex(hash));

export const mkPosition = ({x, y, z}) => `${x} ${y} ${z}`;

// export const mkVolume = ({hash, position, step}) => a => {
//     const result = {
//         ...a,
//         volume: {
//             hash,
//             position: {...position, x: position.x - step.x, y: position.y + step.y, z: position.z - step.z},
//             size: {...step, y: a.height},
//             step: divideByTen(step)
//         }
//     };
//     console.info('mkVolume', {...result.volume}, {...position}, {...a});
//     return result;
// };

// export const mkSurface = ({hash, start, stop, size}, fullRendering) => rangeXZ({hash, start, stop, size});

export const mkDistrict = ({hash, start, stop, size}, fullRendering) => {
    console.info('mkDistrict', hash, start, stop, size);
    let u = -1;

    const adjustPosition = a => b => axes => {
        const result = 
        axes
        .filter(k => k !== 'y')
        .map(axis => ({[axis]: start[axis] + (a[axis] * a.size[axis]) + (b[axis] * b.size[axis])}))
        // .map(axis => ({[axis]: (a[axis] * a.size[axis])}))
        .reduce(merge, {});
        console.info('adjustPosition', {...a}, {...b}, result)
        return result;
    }

    const adjustHeight = coef => a => {
        const size_y = a.size.y * (parseInt(a.hex, 16) * coef);
        const result = { ...a, y: start.y + (size_y / 2), size: {...a.size, y: size_y}};
        console.info('adjustHeight', {...a}, result)
        return result;
    }

    return new Promise(resolve => {
        const districts = rangeXZ({hash, start, stop, size});
        console.warn('districts', districts);
        resolve(
            districts
            .filter(({hex}) => hex !== '0')
            .map(district => ({...district, ...adjustHeight(0.35)(district)}))
            .map((district, i) => {
                if (fullRendering) {
                    return {
                        ...district,
                        sub: rangeXZ({
                            hash: md5.hash(`district:${i}`),
                            start,
                            stop: constants.AXES.map(axis => ({[axis]: start[axis] + district.size[axis]})).reduce(merge, {}),
                            size: constants.AXES.filter(filterY).map(axis => ({[axis]: size[axis] / 10})).reduce(merge, {y: district.size.y}),
                        })
                        .filter(({hex}) => hex !== '0')
                        // .map(district => ({...district, ...adjustHeight(district)}))
                        .map(sector => ({...sector, ...adjustHeight(0.25)({...sector, size: {...sector.size, y: district.size.y / 16}})}))
                        // .map(sector => ({...sector, ...adjustHeight(sector)}))
                        .map(sector => {
                            u++;
                            return {
                                u,
                                ...sector,
                                ...adjustPosition(district)(sector)(constants.AXES)
                            }
                        })
                    };
                }
                return district;
            })
        );
    });
};

// export const mkId = prefix => a => a && `${prefix}-i-${a.i}-${a.hex ? 'h-' + a.hex : ''}-${a.x.toString(16)}${a.y.toString(16)}${a.z.toString(16)}-s-${a.scale}`;
export const mkId = prefix => a => a && `${prefix}-i-${a.i}-${a.hex ? 'h-' + a.hex : ''}`;

export const mkInterleave = axis => start => stop => i => i + start[axis] / stop[axis];

export const mkMax = axis => stop => size => stop[axis] / size[axis];

export const mkRange = size => start => stop => axis => range(mkMax(axis)(stop)(size))()
.map(mkInterleave(axis)(start)(stop))
.map(encapsulate(axis))

export const merge = (a, b) => ({...a, ...b});

export const reducer = initialState => mapping => (state = initialState, action) => {
    if (action && action.type && mapping[action.type]) {
        return mapping[action.type](state, action);
    }
    return state;
};

export const range = max => (a = []) => a.length < max ? range(max)(a.concat([a.length])) : a.map((b, i) => i);

export const rangeElevation = ({size, scale}) => {
    let i = 0;
    const result = range(size)().map(y => {
        return {i: i++, y, scale};
    })
    ;
    return result;
};

export const rangeXZ = ({hash, start, stop, size}) =>
constants.AXES
.filter(filterY)
.map(mkRange(size)(start)(stop))
.reduce((all, a, i) => i === 0 ? a : all.map(({x}) => a.map(({z}) => ({x, z}))))
.reduce((all, a, i) => i === 0 ? a : all.concat(a))
.map((a, i) => ({...a, y: 0, i, stop, size, hex: getHash(hash)(i)}))
