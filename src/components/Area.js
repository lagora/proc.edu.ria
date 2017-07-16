import React from 'react';
import {AXES} from '../constant';
import {merge, mkId, mkPosition} from '../utils';


export const Area = area => {
    console.info('Area', {...area});
    const {hex, size, sub, x, y, z} = area;
    if (hex === '0') {
        return false;
    }
    const id = mkId('area')(area);
    const key = id;
    const position = mkPosition({...AXES.filter(k => k !== 'y').map(axis => ({[axis]: area[axis] + (size[axis] / 2)})).reduce(merge, {y: 0})});
    return (
        <a-box
            id={id}
            key={key}
            position={position}
            width={size.x}
            height={size.y}
            depth={size.z}
        >
        </a-box>
    );
};

export default Area;