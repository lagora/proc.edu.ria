import store from '../store';
import * as constants from '../constants'
import * as helpers from '../helpers';

export const INIT_CLOCK = 'INIT_CLOCK';
export const INIT_SCENE = 'INIT_SCENE';
export const INIT_RENDERER = 'INIT_RENDERER';
export const INIT_HELPERS = 'INIT_HELPERS';
export const INIT_HEMISPHERE_LIGHTS_HELPERS = 'INIT_HEMISPHERE_LIGHTS_HELPERS';
export const INIT_DIRECTIONAL_LIGHTS_HELPERS = 'INIT_DIRECTIONAL_LIGHTS_HELPERS';
export const INIT_SPOT_LIGHTS_HELPERS = 'INIT_SPOT_LIGHTS_HELPERS';
export const INIT_BUFFER_GEOMETRY = 'INIT_BUFFER_GEOMETRY';
export const INIT_SHADOW_MAP = 'INIT_SHADOW_MAP';
export const INIT_FOG = 'INIT_FOG';

export const initClock = () => store.dispatch({ type: INIT_CLOCK });
export const initScene = () => store.dispatch({ type: INIT_SCENE });
export const initRenderer = () => store.dispatch({ type: INIT_RENDERER });
export const initHelpers = () => store.dispatch({ type: INIT_HELPERS });
export const initHemisphereLightsHelpers = () => store.dispatch({ type: INIT_HEMISPHERE_LIGHTS_HELPERS});
export const initDirectionalLightsHelpers = () => store.dispatch({ type: INIT_DIRECTIONAL_LIGHTS_HELPERS});
export const initSpotLightsHelpers = () => store.dispatch({ type: INIT_SPOT_LIGHTS_HELPERS});
export const initBufferGometry = () => store.dispatch({ type: INIT_BUFFER_GEOMETRY });
export const initShadowMap = () => store.dispatch({ type: INIT_SHADOW_MAP });
export const initFog = () => store.dispatch({ type: INIT_FOG });
