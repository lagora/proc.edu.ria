import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Proceduria from './Proceduria';
import {AXES, SCALES} from '../constant';
import {getPlayerPositionByScale, merge, mkDistrict} from '../utils';
import actions from '../redux/actions';
import district from '../redux/district';
// import {mkBlock} from '../../../../../../../Users/Lagora/dev/proc.edu.ria/src/utils';

const store = configureStore();

const {dispatch, getState} = store;

// const updateWithPosition = size => position => {
//   Object.keys(position).length && actions.updateDistrictData({position, size})(dispatch, getState).then(districtList => {
//     actions.updateSectorData({position, size})(dispatch, getState).then(sectorsList => {
//       actions.updateAreaData({position, size})(dispatch, getState);
//     });
//   });
// };

AFRAME.registerSystem('proceduria', {
  init: function() {
    const size = 4;
    actions.setSize(size)(dispatch).then(size => {
      actions.setPillarProps(size)(dispatch, getState);
      actions.setSeed('proc.edu.ria')(dispatch, getState).then(seed => {
        actions.hashFromSeed(seed)(dispatch, getState)
        .then(hash => {
          actions.setPlayerPosition({position: {x: 0, y: (SCALES[0] / 2) * -1, z: 0}})(dispatch, getState)
          .then(start => {
            mkDistrict({
              hash,
              start, 
              stop: {x: size * SCALES[0], y: size * SCALES[0], z: size * SCALES[0]},
              size: {x: SCALES[0], y: SCALES[0], z: SCALES[0]}
            }, true)
            .then(districts => actions.setDistrictData(districts)(dispatch, getState));
          });
        })
      });
    });
  }
});

AFRAME.registerComponent('player', {
  // update: updateWithPosition(),
  init: function() {
    // this.update = AFRAME.utils.throttle(this.update, 100, this);
    // const position = this.el.components.position.data;
    // this.update(this.el.components.position.data);
    // this.el.addEventListener('componentchanged', ({detail}) => ['position'].includes(detail.name) && this.update(detail.newData));
  }
});

export const Root = () => {
  return (
    <Provider store={store}>
      <Proceduria />
    </Provider>
  );
};

(function closure(){
  AFRAME.registerPrimitive('a-lod', {

    defaultComponents: {
      lod: {}
    }
  });

  AFRAME.registerComponent('lod', {
    init: function(){
      const lod = this.lod = new THREE.LOD();
      Array.from( this.el.children ).forEach( function( childElement ){
        childElement.addEventListener( 'loaded', function(){
          const lodLevelComponent = childElement.components[ 'lod-level' ];
          if( lodLevelComponent !== undefined ){
            lod.addLevel( childElement.object3D, lodLevelComponent.data );
          }
        });
      });
      this.el.setObject3D( 'lod', lod );
    },
    tick: function(){
      if( this.el.sceneEl.camera ){
        this.lod.update( this.el.sceneEl.camera );
      }
    }
  });

  AFRAME.registerComponent('lod-level', {
    schema: {
      type: 'number'
    }
  });

})();

export default Root;