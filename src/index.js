import React from 'react';
import {render} from 'react-dom';

import Root from './components/Root'

const doRender = () => render(<Root/>, document.querySelector('#root'));

document.addEventListener('DOMContentLoaded', doRender);