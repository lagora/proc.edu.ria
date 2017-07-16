import React from 'react';
import Sector from './Sector';
import {AXES} from '../constant';
import {merge, mkId, mkPosition} from '../utils';

export const District = district => {
    // console.info('District', {...district});
    const {hex, size, sub, x, y, z} = district;
    const id = mkId('district')(district);
    const key = id;
    const position = mkPosition({...AXES.filter(k => k !== 'y').map(axis => ({[axis]: (district[axis] * size[axis]) + (size[axis] / 2)})).reduce(merge, {y})});
    return (
        <a-entity key={key}>
            {sub && sub.length ? sub.map(Sector) : (
                <a-box
                    id={id}
                    position={position}
                    width={size.x}
                    height={size.y}
                    depth={size.z}
                    material="color: #ff0000; wireframe: true"
                />
            )}
        </a-entity>
    );
};

export default District;