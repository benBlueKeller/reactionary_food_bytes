import * as RecipeActionTypes from '../actionTypes/pantry.js';

export const addItem = (name, nbdno = "", recipeIndex) => {
	return {
		type: RecipeActionTypes.ADD_ITEM,
		name,
		nbdno,
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