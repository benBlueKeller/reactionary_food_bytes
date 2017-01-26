import * as CartActionTypes from '../actionTypes/cart.js';

export const shopListAddItem = (name, nbdno = "") => {
	return {
		type: CartActionTypes.shopListADD_ITEM,
		name,
		nbdno
	}
};

export const shopListRemoveItem = index => {
	return {
		type: CartActionTypes.shopListREMOVE_ITEM,
		index
	}
};

export const shopListChangeItemQty = (index, delta) => {
	return {
		type: CartActionTypes.shopListCHANGE_ITEM_QTY,
		index,
		delta
	}
};

/**
 * Basket actions
 */

export const basketAddItem = (name, nbdno = "") => {
	return {
		type: CartActionTypes.basketADD_ITEM,
		name,
		nbdno
	}
};

export const basketRemoveItem = index => {
	return {
		type: CartActionTypes.basketREMOVE_ITEM,
		index
	}
};

export const basketChangeItemQty = (index, delta) => {
	return {
		type: CartActionTypes.basketCHANGE_ITEM_QTY,
		index,
		delta
	}
};