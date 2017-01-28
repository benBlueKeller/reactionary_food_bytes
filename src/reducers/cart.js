//reducers/cart.js combines a reducer for shopList & basket
import { combineReducers } from 'redux';
import { cart } from '../initial-state';
import * as CartActionTypes from '../actionTypes/cart';

function shopList(state = cart.shopList, action) {	
	switch(action.type){
	    case CartActionTypes.shopList_ADD_ITEM: {
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

	    case CartActionTypes.shopList_REMOVE_ITEM: {
			const removeItemList = [
				...state.food.slice(0, action.index),
				...state.food.slice(action.index + 1)
			];
		    return {
				...state,
				food: removeItemList
			};
		}

	    case CartActionTypes.shopList_CHANGE_ITEM_QTY: {
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

function basket(state = cart.basket, action) {	
	switch(action.type){
	    case CartActionTypes.basket_ADD_ITEM: {
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

	    case CartActionTypes.basket_REMOVE_ITEM: {
			const removeItemList = [
				...state.food.slice(0, action.index),
				...state.food.slice(action.index + 1)
			];
		    return {
				...state,
				food: removeItemList
			};
		}

	    case CartActionTypes.basket_CHANGE_ITEM_QTY: {
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