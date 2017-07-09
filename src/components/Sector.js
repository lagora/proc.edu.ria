import React from 'react';
import Area from './Area';

export const Sector = sector => {
    const {props} = sector;
    // console.info('Sector', sector);
    return (
        <a-box {...props}>
            {sector.sub && sector.sub.map(Area)}
        </a-box>
    );
};

export default Sector;