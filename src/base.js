import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducers/index';

import NavLink from './components/NavLink'
import FoodBytes from './app.jsx';

const store = createStore(
  Reducer,
  window.devToolsExtension && window.devToolsExtension()
);

export default class Base extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="container">
					<header>
						<span className="icn-logo"><i className="material-icons">code</i></span>
						<ul className="main-nav">
							<li><NavLink to="/">Home</NavLink></li>
							<li><NavLink to="/cart">Cart</NavLink></li>
							<li><NavLink to="/recipe">Recipe</NavLink></li>
						</ul>       
					</header>
					{ this.props.children }
				</div>
			</Provider>
		)
	}
}