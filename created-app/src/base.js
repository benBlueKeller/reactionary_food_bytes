import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PantryReducer from './reducers/pantry';

import FoodBytes from './app.jsx';

const store = createStore(
  PantryReducer,
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