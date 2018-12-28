import React from 'react';
import ReactDOM from 'react-dom';
import Assessment from './Assessment';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Assessment />, document.getElementById('root'));
registerServiceWorker();