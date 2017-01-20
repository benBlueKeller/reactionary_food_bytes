//reducers/cart.js combines a reducer for shopList & basket
import { combineReducers } from 'redux';

import * as CartActionTypes from '../actionTypes/cart';

function shopList(state, action) {	
	switch(action.type){
	    case CartActionTypes.shopListADD_ITEM: {
			const addItemList = [...state.food,   {
		        name: action.name,
		        ndbno: action.ndbno,
		        qty: 0
		    }];
		    return {
		        ...state,
				food: addItemList
		 	};
	 	}

	    case CartActionTypes.shopListREMOVE_ITEM: {
			const removeItemList = [
				...state.food.slice(0, action.index),
				...state.food.slice(action.index + 1)
			];
		    return {
				...state,
				food: removeItemList
			};
		}

	    case CartActionTypes.shopListCHANGE_ITEM_QTY: {
			const updateItemList = state.food.map((item, index) => {
				if(index === action.index){
					return {
						...item,
						qty: item.qty + action.delta,
					};
				}
				return item;
			});
			return {
				...state,
				food: updateItemList
			};
		}

	    default:
			return state;
	}
}

function basket(state, action) {	
	switch(action.type){
	    case CartActionTypes.basketADD_ITEM: {
			const addItemList = [...state.food,   {
		        name: action.name,
		        ndbno: action.ndbno,
		        qty: 0
		    }];
		    return {
		        ...state,
				food: addItemList
		 	};
	 	}

	    case CartActionTypes.basketREMOVE_ITEM: {
			const removeItemList = [
				...state.food.slice(0, action.index),
				...state.food.slice(action.index + 1)
			];
		    return {
				...state,
				food: removeItemList
			};
		}

	    case CartActionTypes.basketCHANGE_ITEM_QTY: {
			const updateItemList = state.food.map((item, index) => {
				if(index === action.index){
					return {
						...item,
						qty: item.qty + action.delta,
					};
				}
				return item;
			});
			return {
				...state,
				food: updateItemList
			};
		}

	    default:
			return state;
	}
}

export default combineReducers({
	shopList,
	basket
})