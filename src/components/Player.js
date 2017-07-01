import React from 'react';

export const Player = ({player, props}) => (
    <a-camera
        {...props}
    >
        <a-box/>
    </a-camera>
);

export default Player;