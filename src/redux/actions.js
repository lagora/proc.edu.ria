import {actions as playerActions} from './proceduria';
import {actions as proceduriaActions} from './proceduria';

const merge = (a, b) => ({...a, ...b});

export default [
    playerActions,
    proceduriaActions
].reduce(merge, {});
