import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Proceduria from './Proceduria';
import {AXES, SCALES} from '../constant';
import {getPlayerPositionByScale, merge} from '../utils';
import actions from '../redux/actions';

const store = configureStore();

const {dispatch, getState} = store;

const updateWithPosition = size => position => {
  Object.keys(position).length && actions.updateDistrictData({position, size})(dispatch, getState).then(districtList => {
    actions.updateSectorData({position, size})(dispatch, getState).then(sectorsList => {
      actions.updateAreaData({position, size})(dispatch, getState);
    });
  });
};

AFRAME.registerSystem('proceduria', {
  init: function() {
    actions.setSize(2)(dispatch).then(size => {
      actions.setPillarProps(size)(dispatch, getState);
      actions.setSeed('proc.edu.ria')(dispatch, getState).then(seed => {
        actions.hashFromSeed(seed)(dispatch, getState);
        actions.setPlayerPosition({
          position: {
            x: 0 - ((size / 2) * (SCALES[0] / 2)) + 1, y: 0 - ((size / 2) * (SCALES[0] / 2)), z: 0 - ((size / 2) * (SCALES[0] / 2)) + 1
            // x: Math.random() * ((size * SCALES[0]) / 2),
            // y: Math.random() * ((size * SCALES[0]) / 2),
            // z: Math.random() * ((size * SCALES[0]) / 2)
          }
        })(dispatch, getState);//.then(updateWithPosition(size));
      });
    });
  }
});

AFRAME.registerComponent('player', {
  update: updateWithPosition(),
  init: function() {
    this.update = AFRAME.utils.throttle(this.update, 100, this);
    const position = this.el.components.position.data;
    this.update(this.el.components.position.data);
    this.el.addEventListener('componentchanged', ({detail}) => ['position'].includes(detail.name) && this.update(detail.newData));
  }
});

export const Root = () => {
  return (
    <Provider store={store}>
      <Proceduria />
    </Provider>
  );
};

export default Root;