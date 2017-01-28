import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


//get apis
var apiScript = document.createElement('apiScript');
apiScript.src = 'http://127.0.0.1:3030/api.js';
apiScript.onload = function () {
    if(typeof window.apiKeys !== 'object') {
    	console.error('window.apiKeys is undefined. Check api-server')
    } else {
    	console.log(window.apiKeys);
    }
};

document.head.appendChild(apiScript);
