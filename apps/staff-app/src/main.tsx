import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import {Store} from './app/store';

ReactDOM.render(<Store.Container><App /></Store.Container>, document.getElementById('root'));
