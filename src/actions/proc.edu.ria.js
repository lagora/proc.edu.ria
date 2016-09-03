import store from '../store';

// export const GENERATE = 'GENERATE';

export const GENERATE_PILAR = 'GENERATE_PILAR';
export const GENERATE_SKYBOX = 'GENERATE_SKYBOX';

export const GENERATE_RULES = 'GENERATE_RULES';
export const RULE_0 = 'RULE_0';

export const GENERATE_PROPS = 'GENERATE_PROPS';
export const LOAD_PROPS = 'LOAD_PROPS';
export const SAVE_PROPS = 'SAVE_PROPS';

// export const generate = () => store.dispatch({ type: GENERATE });
export const generatePilar = () => store.dispatch({ type: GENERATE_PILAR });
export const generateSykbox = () => store.dispatch({ type: GENERATE_SKYBOX });

export const generateProps = () => store.dispatch({ type: GENERATE_PROPS });
export const loadProps = () => store.dispatch({ type: LOAD_PROPS });
export const saveProps = () => store.dispatch({ type: SAVE_PROPS });

export const generateRules = () => store.dispatch({ type: GENERATE_RULES });
export const rule0 = () => store.dispatch({ type: RULE_0 });
