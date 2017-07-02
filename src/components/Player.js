import React from 'react';
import {AXES, SCALES} from '../constant';
import {getPlayerPositionByScale, merge, mkId} from '../utils';

export const hudData = ({position}) => {
    position = position.split(' ');
    position = AXES.map((axis, i) => ({[axis]: position[i]})).reduce(merge, {});
    const map = ['district', 'sector', 'area']
    return SCALES.map((scale, i) => {
        const {x, y, z} = getPlayerPositionByScale(true)(scale)(position);
        return mkId(map[i])(position);
    }).join('\n');
};

export const Player = ({position, data}) => {
    return (
        <a-camera
            player
            {...data}
        >
            <a-box material="wireframe: false"/>
            <a-entity
                position="-0.125 0.05 -0.1"
                rotation="0 0 0"
                text-geometry={`value: ${hudData(data)}; size: 0.005; height: 0.001`}
                material={`color: #f00; depthTest: true; flatShading: true`}
                look-at="[player]"
            />
        </a-camera>
    )
};

export default Player;