import React from 'react';

export const Pillar = props => {
    return (
        <a-box {...props}>
            <a-entity
                id="debug-text"
                position={`${props.x - props.width / 2} ${props.y - props.height / 2} ${props.z - props.depth / 2}`}
                text-geometry={`value: ${props.id}; size: 0.5;`}
                material={`color: #f00; depthTest: false; flatShading: true`}
                look-at="[player]"
            />
            
        </a-box>
    );
};

export default Pillar;