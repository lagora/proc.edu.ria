import store from '../store';

export const ADD_HEMISPHERE_LIGHT = 'ADD_HEMISPHERE_LIGHT';
export const ADD_SPOT_LIGHT = 'ADD_SPOT_LIGHT';
export const ADD_DIRECTIONAL_LIGHT = 'ADD_DIRECTIONAL_LIGHT';

export const addHemisphereLight = () => store.dispatch({ type: ADD_HEMISPHERE_LIGHT });
export const addSpotLight = () => store.dispatch({ type: ADD_SPOT_LIGHT });
export const addDirectionalLight = () => store.dispatch({ type: ADD_DIRECTIONAL_LIGHT });
