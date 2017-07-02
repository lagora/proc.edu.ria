import React from 'react';

export const District = ({props}) => {
    return (
        <a-box {...props}>
            <a-entity
                id="debug-text"
                text-geometry={`value: ${props.id}; size: 0.5;`}
                material={`color: #f00; depthTest: false; flatShading: true`}
                look-at="[player]"
            />
        </a-box>
    );
};

export default District;