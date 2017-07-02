import {actions as districtActions} from './district';
import {actions as pillarActions} from './pillar';
import {actions as playerActions} from './player';
import {actions as proceduriaActions} from './proceduria';
import {actions as sectorActions} from './sector';
import {actions as areaActions} from './area';

const merge = (a, b) => ({...a, ...b});

export default [
    districtActions,
    pillarActions,
    playerActions,
    proceduriaActions,
    sectorActions,
    areaActions,
].reduce(merge, {});
