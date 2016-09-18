import * as fpsAction from './fps';
import store from '../store';
import { setLookAt } from './camera';
import {
  updateSunPosition,
} from './proc.edu.ria';

export const update = elapsed => {
  const state = store.getState();
  if (state.clock) {
    updateSunPosition(state.clock.getDelta());
  }

  if (state.cameraAutoRotate) {
    const { size } = state;
    setLookAt(size / 2, 0, size / 2);
    state.cameraControls.update();
    state.cameraAutoRotateAngle += 0.25;
  }

  // fps.setDelta(clock.getDelta());
  // fps.setElapsed(elapsed);
}
