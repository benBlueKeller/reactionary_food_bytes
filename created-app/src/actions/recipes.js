import * as CartActionTypes from '../actionTypes/pantry.js';

export const addItem = (name, nbdno = "") => {
	return {
		type: CartActionTypes.ADD_ITEM,
		name,
		nbdno
	}
};

export const selectItem = index => {
	return {
		type: CartActionTypes.SELECT_ITEM,
		index
	}
};

export const removeItem = index => {
	return {
		type: CartActionTypes.REMOVE_ITEM,
		index
	}
};

export const changeItemQty = (index, delta) => {
	return {
		type: CartActionTypes.CHANGE_ITEM_QTY,
		index,
		delta
	}
};