
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../app.css';

import * as PantryActions from '../actions/pantry.js';
import Header from '../components/header.js';
import Item from '../components/item.js';
import TextForm from '../components/text-form.js';
import SearchForm from '../components/search-form.js';
import AddItemForm from '../components/add-item-form.js';
import Recipe from '../components/recipe.js';
import Cart from '../containers/cart.js';


function foodIsEqual(f, o) {
  console.log("untested");
  if(f.length !== o.length) {
    return false;
  }

  for (var i = f.length - 1; i >= 0; i--) {
    if(f[i].ndbno !== o[i].ndbno) {
      return false;
    }
  }

  if(i < 0) {
    return true;
  }
}


class Pantry extends Component {
	static propTypes = {
		title: React.PropTypes.string,
		food: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
      ndbno: React.PropTypes.string,
      qty: React.PropTypes.number.isRequired
		})).isRequired,
	};

	static defaultProps = {
    title: 'Pantry'
	};

	state = {
		food: this.props.food,
    recipes: [
    {
      name: 'Thai Yellow Curry',
      food: [
        {
          name: "Mae Ploy Yellow Curry Paste",
          ndbno: "45103142",
          qty: 24
        },
        {
          name: "Coconut Milk",
          ndbno: "45086905",
          qty: 402
        },
      ],
    }]
	};

  addRecipe = (recipe) => {
    if(typeof recipe === "string") {
      this.state.recipes.push({name: recipe, food: []});
      this.setState(this.state);
    }
  };


  onItemAdd = (item) => {
    /**note on why push isn't in setState
     * the state variable is pushed
     * then the setState is updated
     * otherwise there's an error
     * because .push does not return
     * an object of state variablesonon
     */
    console.log(this);
    if(typeof item === 'string') {
      this.state.food.push({
        name: item,
        qty: 13
      });
      this.setState(this.state);
    } else if (typeof item === "object") {
      console.warn("BEN, \n only string accepted");
    } else {
      console.warn("item passed to OnItemAdd neither string nor object. type is " + typeof item + "\nItem is " + item);
    }
  };

  onItemRemove = (index) => {
    this.state.food.splice(index, 1);
    this.setState(this.state);
  };

  onItemQtyChange = (index, delta) => {
    this.state.food[index].qty += delta;
    this.setState(this.state);
  };

  consumeRecipe = (food) => {
    food.map(function(itemToAdd) {
      var inPantry = false;
      this.state.food.map(function(item, index) {if(item.ndbno === itemToAdd.ndbno){
        item.qty -= itemToAdd.qty;
        this.state.food[index] = item;
        this.setState(this.state);
        inPantry = true;
      }}.bind(this));
      if(inPantry === false) {
        this.onItemAdd(itemToAdd);
      }
    }.bind(this));
  };

  mapItemsToAdd = (items) => {
    items.map(function(item, index) { this.onItemAdd(item)}.bind(this));
  };
  
  recipeMethods = (recipe) => {

    var recipe0 = recipe;
    var app = this;

            console.log("Pantry1: " + this.state.food);

    /**
     * set finds the original recipe in app state
     * and sets the food equal to food in newRecipe 
     * @param {object} newRecipe is an object with {name:,food:} of
     */
    function set(newRecipe) {
      for (var i = app.state.recipes.length - 1; i >= 0; i--) {
        if(foodIsEqual(app.state.recipes[i].food, recipe0.food)) {
          app.state.recipes[i] = newRecipe;
          app.setState(app.state);
        }
      }
    }

    return {
      addItem: function(item) {
        recipe.food.push({
          name: item.name,
          ndbno: item.ndbno,
          qty: item.qty || "You Kno"
        });
        set(recipe);
      },

      onItemQtyChange: function(index, delta) {
        if(typeof recipe.food[index].qty === "number") {
          recipe.food[index].qty += delta;
        } else {
          recipe.food[index].qty = delta;
        }
        console.log("Pantry: " + app.state.food);
        set(recipe);
      },

      recipeItemRemove: function() {
        app.consumeRecipe(recipe.food);
      } 
    }
  };

  render() {
    const { dispatch, food } = this.props;
    const addItem = bindActionCreators(PantryActions.addItem, dispatch);
    const removeItem = bindActionCreators(PantryActions.removeItem, dispatch);
    const changeItemQty = bindActionCreators(PantryActions.changeItemQty, dispatch);

    return(
      <div>
        <div className="tile">
          <Header title={this.props.title} stopwatch={false} />
          <div className="items">
            {food.map(function(item, index) {
  						return(
  							// TODO:: as you think about data structures, find better keys
  							<Item name={item.name} 
                qty={item.qty}
                onChange={function(delta) {changeItemQty(index, delta)}.bind(this)}
                onRemove={function() {removeItem(index)}.bind(this)} 
                key={typeof item.ndbno !== "undefined" ? item.ndbno : index}/>
  							);
  					}.bind(this))}
  				</div>
  				<AddItemForm onAdd={addItem} />
          <SearchForm onSelect={addItem} />
        </div>
        {this.state.recipes.map(function(recipe, index) {
          console.log(this.state.recipes[index]);
          return (<Recipe key={recipe.name || this.state.recipes.length + 1} 
                          food={recipe.food}
                          methods={this.recipeMethods(recipe)} />)
        }.bind(this))}
        <TextForm onSubmit={this.addRecipe} btnText={"add Recipe"} />
        <Cart />
      </div>
		);
	}
};

const mapStateToProps = state => (
  {
    food: state.pantry.food
  }
)

export default connect(mapStateToProps)(Pantry);
//ReactDOM.render(<Application initialFood={FOOD}/>, document.getElementById('container'));