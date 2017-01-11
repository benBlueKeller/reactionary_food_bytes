import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';
import FoodBytes from './app.jsx';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={FoodBytes} />
      </Router>
    );
  }
}

export default App;
