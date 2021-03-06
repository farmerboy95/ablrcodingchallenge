import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

import './style.scss';

render(
  <Root />,
  document.getElementById('root')
);
