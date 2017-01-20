import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducers/index';

import FoodBytes from './app.jsx';

const store = createStore(
  Reducer,
  window.devToolsExtension && window.devToolsExtension()
);

export default class Base extends Component {
	render() {
		return (
			<Provider store={store}>
				<FoodBytes />
			</Provider>
		)
	}
}