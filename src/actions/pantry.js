import * as PantryActionTypes from '../actionTypes/pantry.js';

export const addItem = item => {
	if(typeof item === 'string') {
		return {
			type: PantryActionTypes.ADD_ITEM,
			name: item,
			ndbno: undefined
		}
	}
	return {
		type: PantryActionTypes.ADD_ITEM,
		...item
	}
};

export const removeItem = (index, id) => {
	return {
		type: PantryActionTypes.REMOVE_ITEM,
		index,
		id
	}
};

export const changeItemQty = (index, delta, id) => {
	return {
		type: PantryActionTypes.CHANGE_ITEM_QTY,
		index,
		delta,
		id
	}
};