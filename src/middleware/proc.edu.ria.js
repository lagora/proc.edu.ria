import {
  GENERATE_POSITIONS,
  GENERATE_DATA,
} from '../constants';

export default store => next => action => {
  const { type } = action;

  // if (type === GENERATE_POSITIONS) {
  //   const { size, hash } = store.getState();
  //   const positions = [];
  //   let i = 0;
  //   function getHeight(elevation) {
  //     // console.log('getHeight', elevation, elevation % 3);
  //     if (elevation % 3 === 0) {
  //       return elevation - 1;
  //     }
  //     return 1;
  //   }
  //   for (let y = 0; y < size; y++) {
  //     for (let x = 0; x < size; x++) {
  //       for (let z = 0; z < size; z++) {
  //         const symbol = hash[i];
  //         const height = getHeight(y + 1);
  //         // console.log(`i:${i}, x:${x}, y:${y}, z:${z}, symbol:${symbol}, height:${height}`);
  //         const position = { i, x, y, z, hash, symbol, height };
  //         positions.push(position);
  //         i++;
  //       }
  //     }
  //   }
  //   return next({ ...action, positions });
  // }

  // if (type === GENERATE_DATA) {
  //   const { cameraType } = store.getState();
  //   console.log('.....', 'cameraType', cameraType);
  //   // if (cameraType === 'orbit') {
  //   //   const positions = [];
  //   //   return next({ ...action, positions });
  //   // }
  // }

  return next(action);
}
