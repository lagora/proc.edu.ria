import store from '../store';

export const DEMO_CUBE = 'DEMO_CUBE';
export const cube = () => store.dispatch({ type: DEMO_CUBE });
