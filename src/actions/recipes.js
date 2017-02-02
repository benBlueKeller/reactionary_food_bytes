import * as RecipeActionTypes from '../actionTypes/recipes.js';

export const addItem = (item, recipeIndex) => {
	if(typeof item === 'string') {
		return {
			type: RecipeActionTypes.ADD_ITEM,
			name: item,
			recipeIndex
		}
	}
	return {
		type: RecipeActionTypes.ADD_ITEM,
		...item,
		recipeIndex
	}
};


export const removeItem = (index, recipeIndex) => {
	return {
		type: RecipeActionTypes.REMOVE_ITEM,
		index,
		recipeIndex
	}
};

export const changeItemQty = (index, delta, recipeIndex) => {
	return {
		type: RecipeActionTypes.CHANGE_ITEM_QTY,
		index,
		delta,
		recipeIndex
	}
};

export const selectRecipe = recipeIndex => {
	return {
		type: RecipeActionTypes.SELECT_RECIPE,
		recipeIndex
	}
};

export const addRecipe = (name, food = []) => {
	return {
		type: RecipeActionTypes.ADD_RECIPE,
		name,
		food
	}
}