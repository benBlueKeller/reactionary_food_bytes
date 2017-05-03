import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartActions from '../actions/cart.js';
import { addItem } from '../actions/pantry.js';
import Header from  '../components/header.js';
import Item from '../components/item.js';
import SearchForm from '../components/search-form.js';

class Cart extends Component {
  static propTypes = {
    food: PropTypes.array.isRequired
  };

  toPantryAction = (item, index) => {
    return {
      type: "to/pantry/from/cart/shopList",
      index,
      ...item
    }
  }

  changeExpDate = (index, delta) => {
    var d = this.props.food[index].expDate || new Date();
    d.setDate(d.getDate() + delta);
    this.setState(this.props.food[index].expDate = d);
    //console.log(this.state.food[index])
  };

  createDateString = (index) => {
    var d = this.props.food[index].expDate || false;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
    return d ? months[d.getMonth()] + ' ' + d.getDate() : 'who kno'
  };

  render() {
    const { dispatch, food } = this.props;
    const shopListAddItem = bindActionCreators(CartActions.shopListAddItem, dispatch);
    const shopListRemoveItem = bindActionCreators(CartActions.shopListRemoveItem, dispatch);
    const shopListChangeItemQty = bindActionCreators(CartActions.shopListChangeItemQty, dispatch);
    const addItemToPantry = bindActionCreators(this.toPantryAction, dispatch);

    const addAllToPantry = () => {
      food.map((item, index) => {
        addItemToPantry(item, index);
      });
    }

    return (
      <div className="tile">
        <Header title="Cart" action={addAllToPantry} />
        <div className="items">
            {food.map(function(item, index) {
              return(
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} 
                onRemove={function() {shopListRemoveItem(index, item.id)}} 
                onChange={function(delta) {this.changeExpDate(index, delta)}.bind(this)} 
                qty={this.createDateString(index)}
                key={item.ndbno}/>
                );
            }.bind(this))}
          </div>
        <SearchForm onSelect={shopListAddItem} btnText="Search" />
      </div>
    );
  }
}

const mapStateToFood = state => (
  {
    food: state.cart.shopList.food
  }
)

export default connect(mapStateToFood)(Cart);