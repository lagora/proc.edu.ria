import store from '../store';

export const LOAD_RULES = 'LOAD_RULES';
export const GENERATE_DATA = 'GENERATE_DATA';
export const GENERATE_MATERIAL = 'GENERATE_MATERIAL';
export const GENERATE_GEOMETRY = 'GENERATE_GEOMETRY';
export const GENERATE_MESH = 'GENERATE_MESH';
export const RULE_0 = 'RULE_0';

export const loadRules = () => dispatch => dispatch({ type: LOAD_RULES });
export const generateData = () => dispatch => dispatch({ type: GENERATE_DATA });
export const generateMaterial = () => dispatch => dispatch({ type: GENERATE_MATERIAL });
export const generateGeometry = () => dispatch => dispatch({ type: GENERATE_GEOMETRY });
export const generateMesh = () => dispatch => dispatch({ type: GENERATE_MESH });
export const rule0 = () => dispatch => dispatch({ type: RULE_0 });
