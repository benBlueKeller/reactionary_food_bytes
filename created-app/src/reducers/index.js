import { combineReducers } from 'redux';

import pantry from './pantry.js';
import cart from './cart.js';

export default combineReducers({
	pantry,
	cart,
})