import React from 'react';

export const Player = ({player, props}) => (
    <a-camera
        player
        {...props}
    >
        <a-box/>
    </a-camera>
);

export default Player;