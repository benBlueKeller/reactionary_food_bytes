import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';
import Base from './base.js';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Base} />
      </Router>
    );
  }
}

export default App;
