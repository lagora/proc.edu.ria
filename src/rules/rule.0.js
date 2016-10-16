// import * as THREE from 'three';
/*
symbol:
  0: empty block
  1-8: quarter block
  9-e: half-block
  f: full block
*/
export const setPosition = symbol => {
  return {
    with: size => {
      let x = 0;
      let y = 0;
      let z = 0;

      if (symbol === '0') {
        return { x, y, z };
      }

      if (symbol === 'f') {
        return { x: size.x / 2, y: size.y / 2, z: size.z / 2 };
      }

      const _int = parseInt(symbol, 16);

      if (0 < _int && _int < 5) {
        y = 0.25;
      } else if (4 < _int && _int < 9) {
        y = 0.75;
      }

      if (_int === 1 || _int === 5) {
        x = 0.25;
      } else if (_int === 2 || _int === 6) {
        x = 0.75;
      }

      if (_int === 3 || _int === 7) {
        y = 0.25;
      } else if (_int === 4 || _int === 8) {
        y = 0.75;
      }

      if (symbol === '9') {
        x = 0.25;
        y = size.y / 2;
        z = size.z / 2;
      }

      if (symbol === 'a') {
        x = 0.75;
        y = size.y / 2;
        z = size.z / 2;
      }

      if (symbol === 'b') {
        x = size.x / 2;
        y = 0.25;
        z = size.z / 2;
      }

      if (symbol === 'c') {
        x = size.x / 2;
        y = 0.75;
        z = size.z / 2;
      }

      if (symbol === 'd') {
        x = size.x / 2;
        y = size.y / 2;
        z = 0.25;
      }

      if (symbol === 'e') {
        x = size.x / 2;
        y = size.y / 2;
        z = 0.75;
      }

      return { x, y, z };
    }
  }
}

export const setSize = symbol => {
  let size = { x: 0.5, y: 0.5, z: 0.5 };
  if (['b', 'c', 'd', 'e', 'f'].indexOf(symbol) > -1) {
    size.x = 1;
  }
  if (['9', 'a', 'd', 'e', 'f'].indexOf(symbol) > -1) {
    size.y = 1;
  }
  if (['9', 'a', 'b', 'c', 'f'].indexOf(symbol) > -1) {
    size.z = 1;
  }
  if ('0' === symbol) {
    size.x = size.y = size.z = 0;
  }
  return size;
};

export const rule = THREE => {
  return {
    from: (symbol) => {
      return {
        withHeight: (height) => {
          return {
            at: (x, y, z) => {
              const debug = [
                // '1', '2', '3', '4',
                // '5', '6', '7', '8',

                // '1', '5',

                '9', 'a',
                'b', 'c',
                'd', 'e',

                'f',
              ];
              if (symbol !== '0' && debug.indexOf(symbol) > -1) {
                const size = setSize(symbol);
                // size.y = height;
                const worldPosition = { x, y, z };
                const localPosition = setPosition(symbol).with(size);
                const position = {
                  x: worldPosition.x + localPosition.x,
                  y: worldPosition.y + localPosition.y,
                  z: worldPosition.z + localPosition.z,
                };
                const geometry = new THREE.BoxBufferGeometry(
                  size.x,
                  size.y,
                  size.z
                );
                const materialArgs = {
                  color: 0xdddddd,
                  specular: 0x009900,
                  shininess: 30,
                  fog: true,
                  wireframe: false,
                  shading: "FlatShading",
                };
                const material = new THREE.MeshPhongMaterial(materialArgs);
                const mesh = new THREE.Mesh( geometry, material );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.position.set(position.x, position.y, position.z);
                // state.scene.add(mesh);
                return mesh;
              }
            }
          }
        }
      }
    }
  }
};
