import * as PantryActionTypes from '../actionTypes/pantry.js';

export const addItem = (name, nbdno = "") => {
	return {
		type: PantryActionTypes.ADD_ITEM,
		name,
		nbdno
	}
};

export const removeItem = index => {
	return {
		type: PantryActionTypes.REMOVE_ITEM,
		index
	}
};

export const changeItemQty = (index, delta) => {
	return {
		type: PantryActionTypes.CHANGE_ITEM_QTY,
		index,
		delta
	}
};