import {
  RULE_0,
} from '../constants';

export default store => next => action => {
  const { type } = action;

  if (type === RULE_0) {
    const { positions } = store.getState();
    positions.forEach(position => {
      // console.log('position', position);
    });
  } else {
    return next(action);
  }
}
