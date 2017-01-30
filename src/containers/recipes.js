import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as RecipeActions from '../actions/recipes.js';
import Header from  '../components/header.js';
import Item from '../components/item.js';
import SearchForm from '../components/search-form.js';

class Recipe extends Component {
  static propTypes = {
    food: PropTypes.array.isRequired,
    selected: PropTypes.number.isRequired
  }

  render() {
    const { dispatch, food, selected } = this.props;
    const addItem = bindActionCreators(RecipeActions.addItem, dispatch);
    const removeItem = bindActionCreators(RecipeActions.removeItem, dispatch);
    const changeItemQty = bindActionCreators(RecipeActions.changeItemQty, dispatch);

    return (
      <div className="tile">
      <Header title="Recipe" />
      <div className="items">
        {food.map(function(item, index) {
          return (
            // TODO:: as you think about data structures, find better keys
            <Item name={item.name} 
            qty={item.qty}
            onChange={function(delta) {changeItemQty(index, delta, selected)}}
            onRemove={function() {removeItem(index, selected)}} 
            key={typeof item.ndbno !== "undefined" ? item.ndbno : index} /> );
        })}
      </div>
      <SearchForm onSelect={function(item) {addItem(item, selected)}} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    selected: state.recipes.selected,
    food: state.recipes.mine[state.recipes.selected].food
  }
)

export default connect(mapStateToProps)(Recipe);