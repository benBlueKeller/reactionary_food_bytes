import React, { Component, PropTypes } from 'react';

import Header from  './header.js';
import Item from './item.js';
import SearchForm from './search-form.js';

export default class Cart extends Component {
  static propTypes = {
    onItemAdd: PropTypes.func.isRequired,
    onFinish: PropTypes.func
  };

  state = {
    food: []
  };

  addItem = (item) => {
    this.state.food.push({
      name: item.name,
      ndbno: item.ndbno
    });
    this.setState(this.state);
  };

  changeExpDate = (index, delta) => {
    var d = this.state.food[index].expDate || new Date();
    d.setDate(d.getDate() + delta);
    this.setState(this.state.food[index].expDate = d);
    //console.log(this.state.food[index])
  };

  createDateString = (index) => {
    var d = this.state.food[index].expDate || false;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
    return d ? months[d.getMonth()] + ' ' + d.getDate() : 'who kno'
  };

  onFinish = () => {this.props.onFinish(this.state.food)};

  render() {
    return (
      <div className="tile">
        <Header title="Cart" action={this.onFinish} />
        <div className="items">
            {this.state.food.map(function(item, index) {
              return(
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} 
                onRemove={function() {this.props.onItemAdd(item)}.bind(this)} 
                onChange={function(delta) {this.changeExpDate(index, delta)}.bind(this)} 
                qty={this.createDateString(index)}
                key={item.ndbno}/>
                );
            }.bind(this))}
          </div>
        <SearchForm onSelect={this.addItem} btnText="Search" />
      </div>
    );
  }
}