import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './recipes-menu.css';
import { selectRecipe } from '../actions/recipes.js';

class RecipeMenu extends Component {
	static propTypes = {
		recipeNames: PropTypes.array.isRequired
	}

	render() {
		const { recipeNames, dispatch } = this.props;
		const select = bindActionCreators(selectRecipe, dispatch);

		return (
			<ul className="recipes-menu">
				<div className="show-menu" ></div>
				{recipeNames.map((recipeName, index) => {
					return <li onClick={() => {select(index)}}>{recipeName}</li>
				})}
			</ul>
		)
	}
}

const mapStateToProps = state => (
  {
    recipeNames: state.recipes.mine.map(recipe => recipe.name)
  }
)

export default connect(mapStateToProps)(RecipeMenu);

