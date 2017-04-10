import * as CartActionTypes from '../actionTypes/cart.js';

export const shopListAddItem = (item, nbdno) => {
	if(typeof item === 'string') {
		return {
			type: CartActionTypes.shopList_ADD_ITEM,
			name: item,
			nbdno
		}
	}
	return {
		type: CartActionTypes.shopList_ADD_ITEM,
		...item
	}
};

export const shopListRemoveItem = (index, id) => {
	return {
		type: CartActionTypes.shopList_REMOVE_ITEM,
		index,
		id
	}
};

export const shopListChangeItemQty = (index, delta, id) => {
	return {
		type: CartActionTypes.shopList_CHANGE_ITEM_QTY,
		index,
		delta,
		id
	}
};

/**
 * Basket actions
 */

export const basketAddItem = (name, nbdno = "") => {
	return {
		type: CartActionTypes.basket_ADD_ITEM,
		name,
		nbdno
	}
};

export const basketRemoveItem = index => {
	return {
		type: CartActionTypes.basket_REMOVE_ITEM,
		index
	}
};

export const basketChangeItemQty = (index, delta) => {
	return {
		type: CartActionTypes.basket_CHANGE_ITEM_QTY,
		index,
		delta
	}
};