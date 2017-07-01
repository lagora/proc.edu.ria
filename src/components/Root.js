import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import Proceduria from './Proceduria';

import actions from '../redux/actions';

const store = configureStore();

const {dispatch, getState} = store;

console.info('actions', actions);

actions.setSize(1)(dispatch).then(size => actions.setPillarProps(size)(dispatch, getState));

actions.setSeed('proc.edu.ria')(dispatch, getState).then(seed => 
  actions.hashFromSeed(seed)(dispatch, getState).then(hash => {
    console.info('hash', hash)
    // return actions.setMixins(hash)(dispatch, getState);
    // return actions.setCityBlocks(hash)(dispatch, getState);
    actions.setPlayerPosition()(dispatch, getState);
  })
)

export const Root = () => {
  return (
    <Provider store={store}>
      <Proceduria />
    </Provider>
  );
}

export default Root;