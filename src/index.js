import React from 'react';
import {render} from 'react-dom';

import Root from './components/Root';

require('aframe-text-geometry-component');
require('aframe-look-at-component');

const doRender = () => render(<Root/>, document.querySelector('#root'));

document.addEventListener('DOMContentLoaded', doRender);