import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Proceduria from './Proceduria';
import {SCALES} from '../constant';
import actions from '../redux/actions';

const store = configureStore();

const {dispatch, getState} = store;

AFRAME.registerSystem('proceduria', {
  init: function() {
    actions.setSize(2)(dispatch).then(size => {
      actions.setPillarProps(size)(dispatch, getState);
      actions.setSeed('proc.edu.ria')(dispatch, getState).then(seed => {
        actions.hashFromSeed(seed)(dispatch, getState);
        actions.setPlayerPosition({
          position: {
            x: Math.random() * ((size * SCALES[0]) / 2),
            y: Math.random() * ((size * SCALES[0]) / 2),
            z: Math.random() * ((size * SCALES[0]) / 2)
          }
        })(dispatch, getState).then(position => {
          actions.updateDistrictData({position, size})(dispatch, getState);
        });
      });
    });
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