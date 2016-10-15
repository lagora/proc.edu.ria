import store from '../store';
import * as constants from '../constants'
import * as helpers from '../helpers';

export const INIT_CLOCK = 'INIT_CLOCK';
export const INIT_SCENE = 'INIT_SCENE';
export const INIT_RENDERER = 'INIT_RENDERER';
export const INIT_HELPERS = 'INIT_HELPERS';
export const ADD_GRID_HELPERS = 'ADD_GRID_HELPERS';
export const ADD_AXIS_HELPERS = 'ADD_AXIS_HELPERS';
export const ADD_HEMISPHERE_LIGHTS_HELPERS = 'ADD_HEMISPHERE_LIGHTS_HELPERS';
export const INIT_DIRECTIONAL_LIGHTS_HELPERS = 'INIT_DIRECTIONAL_LIGHTS_HELPERS';
export const INIT_SPOT_LIGHTS_HELPERS = 'INIT_SPOT_LIGHTS_HELPERS';
export const INIT_BUFFER_GEOMETRY = 'INIT_BUFFER_GEOMETRY';
export const INIT_SHADOW_MAP = 'INIT_SHADOW_MAP';
export const ADD_FOG = 'ADD_FOG';

export const ADD_HEMISPHERE_LIGHT = 'ADD_HEMISPHERE_LIGHT';
export const ADD_SPOT_LIGHT = 'ADD_SPOT_LIGHT';
export const ADD_DIRECTIONAL_LIGHT = 'ADD_DIRECTIONAL_LIGHT';

// export const initClock = () => { return { type: INIT_CLOCK }; };
export const initClock = () => dispatch => dispatch({ type: INIT_CLOCK });
export const initScene = () => dispatch => dispatch({ type: INIT_SCENE });
export const initRenderer = () => dispatch => dispatch({ type: INIT_RENDERER });
export const initHelpers = () => {
  return [
  { type: ADD_GRID_HELPERS },
  { type: ADD_AXIS_HELPERS }
  ];
};

export const addHemisphereLight = () => dispatch => dispatch({ type: ADD_HEMISPHERE_LIGHT });
export const addSpotLight = () => dispatch => dispatch({ type: ADD_SPOT_LIGHT });
export const addDirectionalLight = () => dispatch => dispatch({ type: ADD_DIRECTIONAL_LIGHT });

export const updateLightPosition = (lightType, position) => {
};
export const initHemisphereLightsHelpers = () => dispatch => dispatch({ type: ADD_HEMISPHERE_LIGHTS_HELPERS});
export const initDirectionalLightsHelpers = () => dispatch => dispatch({ type: INIT_DIRECTIONAL_LIGHTS_HELPERS});
export const initSpotLightsHelpers = () => dispatch => dispatch({ type: INIT_SPOT_LIGHTS_HELPERS});
export const initBufferGometry = () => dispatch => dispatch({ type: INIT_BUFFER_GEOMETRY });
export const initShadowMap = () => dispatch => dispatch({ type: INIT_SHADOW_MAP });
export const initFog = () => dispatch => dispatch({ type: ADD_FOG });
