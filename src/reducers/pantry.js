import * as PantryActionTypes from '../actionTypes/pantry';
import * as funcs from '../methods/reducer-funcs.js';
import { pantry } from '../initial-state';

export default function Pantry(state=pantry, action) {	
	switch(action.type){
		case PantryActionTypes.ADD_ITEM: {
		    return {
				...state,
				food: funcs.addItem(state.food, action)
		 	};
		}

		case PantryActionTypes.ADD_ID: {
			return {
				...state,
				food: funcs.addID(state.food, action)
			}
		}

		case PantryActionTypes.REMOVE_ITEM: {
		    return {
				...state,
				food: funcs.removeItem(state.food, action)
			};
		}

		case PantryActionTypes.CHANGE_ITEM_QTY: {
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