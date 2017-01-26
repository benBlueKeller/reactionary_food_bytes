import React, { PropTypes } from 'react';

import Header from  './header.js';
import Item from './item.js';
import SearchForm from './search-form.js';

const Recipe = (props) => {
  return (
    <div className="tile">
    <Header title="Recipe" action={props.methods.recipeItemRemove}/>
    <div className="items">
      {props.food.map(function(item, index) {
        return (
          // TODO:: as you think about data structures, find better keys
          <Item name={item.name} 
          qty={item.qty}
          onChange={function(delta) {props.methods.onItemQtyChange(index, delta)}}
          onRemove={function(index) {props.methods.recipeItemRemove(index)}} 
          key={typeof item.ndbno !== "undefined" ? item.ndbno : index} /> );
      })}
    </div>
    <SearchForm onSelect={props.methods.addItem} />
    </div>
  );
}

Recipe.propTypes = {
  food: PropTypes.array.isRequired,
  methods: PropTypes.object.isRequired,
}

export default Recipe;