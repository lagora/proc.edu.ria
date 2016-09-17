import store from '../store';

// export const GENERATE = 'GENERATE';

export const SET_SQUARE_SIZE = 'SET_SQUARE_SIZE';
export const SET_CUBIC_SIZE = 'SET_CUBIC_SIZE';
export const MAKE_HASH_FROM_SEED = 'MAKE_HASH_FROM_SEED';
export const GENERATE_HASH_RANGE = 'GENERATE_HASH_RANGE';
export const MAKE_CITY_PILAR = 'MAKE_CITY_PILAR';

export const setSquareSize = () => store.dispatch({ type: SET_SQUARE_SIZE });
export const setCubicSize = () => store.dispatch({ type: SET_CUBIC_SIZE });
export const makeHashFromSeed = seed => store.dispatch({ type: MAKE_HASH_FROM_SEED, seed });
export const generateHashRange = seed => store.dispatch({ type: GENERATE_HASH_RANGE });
export const makeCityPilar = () => store.dispatch({ type: MAKE_CITY_PILAR });

// export const GENERATE_PILAR = 'GENERATE_PILAR';
// export const GENERATE_SKYBOX = 'GENERATE_SKYBOX';
//
// export const GENERATE_RULES = 'GENERATE_RULES';
// export const RULE_0 = 'RULE_0';
//
// export const GENERATE_PROPS = 'GENERATE_PROPS';
// export const LOAD_PROPS = 'LOAD_PROPS';
// export const SAVE_PROPS = 'SAVE_PROPS';
//
// // export const generate = () => store.dispatch({ type: GENERATE });
// export const generatePilar = () => store.dispatch({ type: GENERATE_PILAR });
// export const generateSykbox = () => store.dispatch({ type: GENERATE_SKYBOX });
//
// export const generateProps = () => store.dispatch({ type: GENERATE_PROPS });
// export const loadProps = () => store.dispatch({ type: LOAD_PROPS });
// export const saveProps = () => store.dispatch({ type: SAVE_PROPS });
//
// export const generateRules = () => store.dispatch({ type: GENERATE_RULES });
// export const rule0 = () => store.dispatch({ type: RULE_0 });
