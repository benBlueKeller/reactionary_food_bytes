import * as PantryActionTypes from '../actionTypes/pantry';
import { pantry } from '../initial-state';

export default function Pantry(state=pantry, action) {	
	switch(action.type){
		case PantryActionTypes.ADD_ITEM: {
			const addItemList = [...state,   {
		        name: action.name,
		        ndbno: action.ndbno,
		        qty: 0
		    }];
		    return {
		        ...state,
						pantry: addItemList
				 	};
			}

		case PantryActionTypes.REMOVE_ITEM: {
			const removeItemList = [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			];
		    return {
				...state,
				pantry: removeItemList
			};
		}

		case PantryActionTypes.CHANGE_ITEM_QTY: {
			const updateItemList = state.map((item, index) => {
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
				pantry: updateItemList
			};
		}

		default:
			return state;
	}
}