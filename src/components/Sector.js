import React from 'react';
import {AXES} from '../constant';
import {merge, mkId, mkPosition} from '../utils';

export const Sector = sector => {
    // console.info('Sector', {...sector});
    const {hex, size, sub, x, y, z} = sector;
    const id = mkId('sector')(sector);
    const key = id;
    const position = mkPosition({...AXES.filter(k => k !== 'y').map(axis => ({[axis]: sector[axis] + (size[axis] / 2)})).reduce(merge, {y: sector.y})});
    return (
        <a-box
            id={id}
            key={key}
            position={position}
            width={size.x}
            height={size.y}
            depth={size.z}
        />
    );
};

export default Sector;