import * as RecipeActionTypes from '../actionTypes/recipes';
import * as funcs from '../methods/reducer-funcs.js';
import { recipes } from '../initial-state';

export default function RecipeReducer(state=recipes, action) {	
	switch(action.type){
		case RecipeActionTypes.ADD_ITEM: {
		    return {
				...state,
				mine: state.mine.map((recipe, i) => {
					if(i === action.recipeIndex) {
						return {
							...recipe,
							food: funcs.addItem(recipe.food, action)
						};
					}
					return recipe;
				})
		 	};
		}

		case RecipeActionTypes.ADD_ID: {
			return {
				...state,
				mine: state.mine.map((recipe, i) => {
					if(i === action.recipeIndex) {
						return {
							...recipe,
							food: funcs.addID(recipe.food, action)
						};
					}
					return recipe;
				})
		 	};
			return {
				...state,
				food: funcs.addID(state.food, action)
			}
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

		case RecipeActionTypes.ADD_RECIPE: {
			return {
				...state,
				mine: [
					...state.mine,
					{
						name: action.name,
						food: action.food
					}
				]
			}
		}

		default:
			return state;
	}
}