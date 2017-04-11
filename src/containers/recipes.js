import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RecipeActions from '../actions/recipes.js';
import RecipeMenu from './recipes-menu.js';
import Header from  '../components/header.js';
import Item from '../components/item.js';
import SearchForm from '../components/search-form.js';
import TextForm from '../components/text-form.js';

class Recipe extends Component {
  static propTypes = {
    recipe: PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      food: React.PropTypes.array.isRequired
    }).isRequired,
    selected: PropTypes.number.isRequired
  }

  render() {
    const { dispatch, recipe, selected } = this.props;
    const addItem = bindActionCreators(RecipeActions.addItem, dispatch);
    const removeItem = bindActionCreators(RecipeActions.removeItem, dispatch);
    const changeItemQty = bindActionCreators(RecipeActions.changeItemQty, dispatch);
    const addRecipe = bindActionCreators(RecipeActions.addRecipe, dispatch);

    return (
      <div className="recipes">
        <RecipeMenu />
        <div className="tile">
          <Header title={recipe.name} />
          <div className="items">
            {recipe.food.map(function(item, index) {
              return (
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} 
                qty={item.qty}
                onChange={function(delta) {changeItemQty(index, delta, selected, item.id)}}
                onRemove={function() {removeItem(index, selected)}} 
                key={typeof item.ndbno !== "undefined" ? item.ndbno : index} /> );
            })}
          </div>
          <SearchForm onSelect={function(item) {addItem(item, selected)}} />
          <TextForm onSubmit={addRecipe} btnText={"add Recipe"} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    selected: state.recipes.selected,
    recipe: state.recipes.mine[state.recipes.selected]
  }
)

export default connect(mapStateToProps)(Recipe);