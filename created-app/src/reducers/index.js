import { combineReducers } from 'redux';

import pantry from './pantry.js';
import cart from './cart.js';
import recipes from './recipes.js'

export default combineReducers({
	pantry,
	cart,
	recipes
})