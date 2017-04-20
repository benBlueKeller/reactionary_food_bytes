import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import Reducer from './reducers/index';

import dataLogger from './middleware/data-logger.js';
import locationChanger from './middleware/location-changer.js';


import NavLink from './components/NavLink';

const store = createStore(
  Reducer,
  window.devToolsExtension && window.devToolsExtension(),
  applyMiddleware(locationChanger, dataLogger)
);

export default class Base extends Component {
	constructor() {
		super();
		//load data for app
		store.dispatch({ type: 'LOAD' });
	}

	render() {
		return (
			<Provider store={store}>
				<div className="container">
					<header>
						<span className="icn-logo"><i className="material-icons">code</i></span>
						<ul className="main-nav">
							<li><NavLink to="/">Home</NavLink></li>
							<li><NavLink to="/cart">Cart</NavLink></li>
							<li><NavLink to="/recipes">Recipes</NavLink></li>
						</ul>       
					</header>
					{ this.props.children }
				</div>
			</Provider>
		)
	}
}