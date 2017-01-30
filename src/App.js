import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';
import Base from './base';
import Pantry from './containers/pantry';
import Cart from './containers/cart';
import Recipe from './containers/recipe';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Base}>
	        <Route path="/" component={Pantry} />
	        <Route path="/cart" component={Cart} />
	        <Route path="/cart" component={Recipe} />
        </Route>
      </Router>
    );
  }
}

export default App;
