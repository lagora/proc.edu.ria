import store from '../store';

export const NULL_ACTION = 'NULL_ACTION';
export const nullAction = () => store.dispatch({ type: NULL_ACTION });
