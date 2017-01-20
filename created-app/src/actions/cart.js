import * as CartActionTypes from '../actionTypes/cart.js';

export const shopListAddItem = (name, nbdno = "") => {
	return {
		type: PantryActionTypes.shopListADD_ITEM,
		name,
		nbdno
	}
};

export const shopListRemoveItem = index => {
	return {
		type: PantryActionTypes.shopListREMOVE_ITEM,
		index
	}
};

export const shopListChangeItemQty = (index, delta) => {
	return {
		type: PantryActionTypes.shopListCHANGE_ITEM_QTY,
		index,
		delta
	}
};

/**
 * Basket actions
 */

export const basketAddItem = (name, nbdno = "") => {
	return {
		type: PantryActionTypes.basketADD_ITEM,
		name,
		nbdno
	}
};

export const basketRemoveItem = index => {
	return {
		type: PantryActionTypes.basketREMOVE_ITEM,
		index
	}
};

export const basketChangeItemQty = (index, delta) => {
	return {
		type: PantryActionTypes.basketCHANGE_ITEM_QTY,
		index,
		delta
	}
};