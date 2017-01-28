import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';
import Base from './base';
import Pantry from './containers/pantry';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Base}>
	        <Route path="/" component={Pantry} />
        </Route>
      </Router>
    );
  }
}

export default App;
