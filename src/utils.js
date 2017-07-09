import * as constants from './constant';
import md5 from 'spark-md5';
import district from '../../../../../../Users/Lagora/dev/proc.edu.ria/src/redux/district';

export const adjustYAsHalfHeight = a => ({...a, y : a.y + (a.height / 2)});

export const alignToGround = a => a && ({...a, y: a.y * a.scale});

export const alignAXES = axes => a => a && axes.length && ({...a, ...axes.map(k => ({[k]: (a[k] * a.scale) + (a.scale / 2)}))})

// export const alignY = a => a && ({...a, y: (a.y * a.scale) + (a.scale / 2)});
export const alignY = a => alignAXES(['y'])(a);// a && ({...a, y: (a.y * a.scale) + (a.scale / 2)});

export const alignXZ = a => a && ({...a, x: (a.x * a.scale) + (a.scale / 2), z: (a.z * a.scale) + (a.scale / 2)});
// export const alignXZ = a => alignAXES(['x', 'z'])(a);//a && ({...a, x: (a.x * a.scale) + (a.scale / 2), z: (a.z * a.scale) + (a.scale / 2)});

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

export const mkDistrict = ({hash, position, scale, size}) => {
    const result =
    rangeXZ({size, scale, hash})
    .filter(({hex}) => hex !== '0')
    .map(a => ({...a, width: a.scale, height: a.scale, depth: a.scale}))
    .map(a => ({...a, y: a.y - a.height / 2}))
    .map(heightFromHex(0.25))
    .map(adjustYAsHalfHeight)
    // .map(a => ({...a, inside: contain(position)(a)}))
    .map(a => ({...a, inside: distance(position)(a) < a.scale}))
    .map(a => {
        if (a.inside)   console.info('district', a.inside, position, a);
        const sub = a.inside ? mkSector({hash: md5.hash(`${a.hex}${a.i}${hash}`), position, scale: scale / 10, size: 10})
        .map(b => ({...b, x: b.x - (a.width / 2), y: b.y - a.height / 2, z: b.z - (a.depth / 2)}))
        // .map(b => ({...b, inside: contain(position)(b)}))
        .map(b => ({...b, inside: distance(position)(b) < b.scale}))
        .map(b => {
            if (b.inside) console.info('sector', b.inside, position, b);
            return b;
        })
        .map(b => mkBlock({...b, id: mkId('sector')(b)}, `wireframe: ${b.inside}; color: ${b.inside ? '#0f0' : '#fff'}`))
        .map(b => ({...b, key: b.id}))
        : false;

        return sub ? {...a, sub} : a;
    })
    .map(a => mkBlock({...a, id: mkId('district')(a)}, `wireframe: ${a.inside}; color: ${a.inside ? '#f00' : '#fff'}`))
    .map(a => ({...a, key: a.id}))

    return result;
};

export const mkSector = ({hash, position, scale, size}) => {
    const result =
    rangeXZ({size, scale, hash})
    .filter(({hex}) => hex !== '0')
    .map(a => ({...a, width: a.scale, height: a.scale, depth: a.scale}))
    .map(heightFromHex(0.25))
    .map(adjustYAsHalfHeight)
    .map(a => {
        const sub = a.inside ? mkArea({hash: md5.hash(`${a.hex}${a.i}${hash}`), position, scale: scale / 4, size: 4})
        .map(b => ({...b, x: b.x - (a.width / 2), y: b.y - a.height / 2, z: b.z - (a.depth / 2)}))
        // .map(b => ({...b, inside: contain(position)(b)}))
        .map(b => ({...b, inside: distance(position)(b) < b.scale}))
        .map(b => {
            if (b.inside) console.info('area', b.inside, position, b);
            return b;
        })
        .map(b => mkBlock({...b, id: mkId('area')(b)}, `wireframe: ${b.inside}; color: ${b.inside ? '#00f' : '#fff'}`))
        .map(b => ({...b, key: b.id}))
        : false;

        return sub ? {...a, sub} : a;
    })

    return result;
};

export const mkArea = ({hash, position, scale, size}) => {
    const result =
    rangeXZ({size, scale, hash})
    .filter(({hex}) => hex !== '0')
    .map(a => ({...a, width: a.scale, height: a.scale, depth: a.scale}))
    .map(heightFromHex(0.25))
    .map(adjustYAsHalfHeight)

    return result;
};

// export const mkId = prefix => a => a && `${prefix}-i-${a.i}-${a.hex ? 'h-' + a.hex : ''}-${a.x.toString(16)}${a.y.toString(16)}${a.z.toString(16)}-s-${a.scale}`;
export const mkId = prefix => a => a && `${prefix}-i-${a.i}-${a.hex ? 'h-' + a.hex : ''}-s-${a.scale}`;

export const merge = (a, b) => ({...a, ...b});

export const reducer = initialState => mapping => (state = initialState, action) => {
    if (action && action.type && mapping[action.type]) {
        return mapping[action.type](state, action);
    }
    return state;
};

export const range = max => (a = []) => a.length < max ? range(max)(a.concat([a.length])) : a;

export const rangeElevation = ({size, scale}) => {
    let i = 0;
    const result = range(size)().map(y => {
        return {i: i++, y, scale};
    })
    ;
    return result;
};

export const rangeXZ = ({size, scale, hash}) => {
    let i = -1;
    const result = range(size)().map(z => {
        return range(size)().map(x => {
            i++
            return {i, x, y: 0, z, scale, hex: getHash(hash)(i)};
        }).reduce(concat, []);
    }).reduce(concat, [])
    .filter(a => a.hex !== '0')
    .map(alignXZ)
    ;
    return result;
};

export const rangeXYZ = ({size, scale, hash}) => {
    let i = 0;
    const result = range(size)().map((y) => {
        return range(size)().map((z) => {
            return range(size)().map(x => {
                return {i: i++, x, y, z, scale, hex: getHash(hash)(i)};
            }).reduce(concat, []);
        }).reduce(concat, []);
    }).reduce(concat, [])
    .filter(a => a.hex !== '0')
    .map(alignToGround)
    .map(alignXZ)
    ;
    // console.info('rangeXYZ', result);
    return result;
};
