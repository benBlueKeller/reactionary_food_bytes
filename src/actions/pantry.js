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

export const removeItem = index => {
	return {
		type: PantryActionTypes.REMOVE_ITEM,
		index
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