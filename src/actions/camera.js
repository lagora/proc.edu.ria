import store from '../store';
import * as constants from '../constants'
import * as helpers from '../helpers';

export const SET_PERSPECTIVE_CAMERA = 'SET_PERSPECTIVE_CAMERA';
export const SET_CAMERA_POSITION = 'SET_CAMERA_POSITION';
export const SET_CAMERA_LOOK_AT = 'SET_CAMERA_LOOK_AT';
export const SET_CAMERA_CONTROLS = 'SET_CAMERA_CONTROLS'

export const setPerspectiveCamera = () => store.dispatch({ type : SET_PERSPECTIVE_CAMERA });
export const setPosition = (x, y, z) => store.dispatch({ type: SET_CAMERA_POSITION, x, y, z });
export const setLookAt = (x, y, z) => store.dispatch({ type: SET_CAMERA_LOOK_AT, x, y, z });
export const setControls = (cameraType) => store.dispatch({ type: SET_CAMERA_CONTROLS, cameraType });

export const initCamera = () => {
  const { size } = store.getState();
  const position = size * 1.5;
  return [
    setPerspectiveCamera(),
    setPosition(position, position, position),
    // setLookAt(size, size, size),
    setLookAt(0, 0, 0),
    setControls(constants.CAMERA_TYPE_ORBITAL),
  ];
}
