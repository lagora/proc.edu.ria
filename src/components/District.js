import React from 'react';
import Sector from './Sector';

export const District = district => {
    const {props} = district;
    return (
        <a-box {...props}>
            {district.sub && district.sub.map(Sector)}
        </a-box>
    );
};

export default District;