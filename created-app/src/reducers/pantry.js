import * as PantryActionTypes from '../actionTypes/pantry';
import initialState from '../initial-state';

export default function Pantry(state=initialState, action) {	
	switch(action.type){
		case PantryActionTypes.ADD_ITEM: {
			const addItemList = [...state.pantry,   {
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
				...state.pantry.slice(0, action.index),
				...state.pantry.slice(action.index + 1)
			];
		    return {
				...state,
				pantry: removeItemList
			};
		}

		case PantryActionTypes.CHANGE_ITEM_QTY: {
			const updateItemList = state.pantry.map((item, index) => {
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