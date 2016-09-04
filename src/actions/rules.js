import store from '../store';

export const LOAD_RULES = 'LOAD_RULES';
export const GENERATE_DATA = 'GENERATE_DATA';
export const GENERATE_MATERIAL = 'GENERATE_MATERIAL';
export const GENERATE_GEOMETRY = 'GENERATE_GEOMETRY';
export const GENERATE_MESH = 'GENERATE_MESH';
export const RULE_0 = 'RULE_0';

export const loadRules = () => store.dispatch({ type: LOAD_RULES });
export const generateData = () => store.dispatch({ type: GENERATE_DATA });
export const generateMaterial = () => store.dispatch({ type: GENERATE_MATERIAL });
export const generateGeometry = () => store.dispatch({ type: GENERATE_GEOMETRY });
export const generateMesh = () => store.dispatch({ type: GENERATE_MESH });
export const rule0 = () => store.dispatch({ type: RULE_0 });
