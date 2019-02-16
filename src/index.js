import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CoinsMonitor from './CoinsMonitor';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CoinsMonitor />, document.getElementById('root'));
registerServiceWorker();
