import * as deltaActions from './delta';

export const update = delta => {
  delta.setDelta(delta);
  console.log('update');
}
