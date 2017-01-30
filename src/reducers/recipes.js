import * as RecipeActionTypes from '../actionTypes/recipes';
import { recipes } from '../initial-state';

export default function RecipeReducer(state=recipes, action) {	
	switch(action.type){
		case RecipeActionTypes.ADD_ITEM: {
			const newFood = [...state.mine[action.recipeIndex].food,   {
		        name: action.name,
		        ndbno: action.ndbno,
		        qty: 0
		    }];

		    return {
				...state,
				mine: state.mine.map((recipe, i) => {
					if(i === action.recipeIndex) {
						return {
							...recipe,
							food: newFood
						};
					}
					return recipe;
				})
		 	};
		}

		case RecipeActionTypes.REMOVE_ITEM: {
			const foodAfterRemoval = [
				...state.mine[action.recipeIndex].food.slice(0, action.index),
				...state.mine[action.recipeIndex].food.slice(action.index + 1)
			];
		    return {
				...state,
				mine: state.mine.map((recipe, i) => {
					if(i === action.recipeIndex) {
						return {
							...recipe,
							food: foodAfterRemoval
						};
					}
					return recipe;
				})
			};
		}

		case RecipeActionTypes.CHANGE_ITEM_QTY: {
			return {
				...state,
				mine: state.mine.map((recipe, i) => {
					if(i === action.recipeIndex) {
						var newFood = recipe.food.map((item, i) => {
							if(i === action.index) {
								return {
									...item,
									qty: item.qty + action.delta
								};
							}
							return item;
						});
						return {
							...recipe,
							food: newFood
						};
					}
					return recipe;
				})

			};
		}

		case RecipeActionTypes.SELECT_RECIPE: {
			return {
				...state,
				selected: action.recipeIndex
			}
		}

		default:
			return state;
	}
}