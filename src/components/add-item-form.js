import React, { Component, PropTypes } from 'react';

import TextForm from './text-form.js'

export default class AddItemForm extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };
  
  onSubmit = (name) => {
    this.props.onAdd(name);
  };
  
  render() {
    return (
      <TextForm onSubmit={this.onSubmit} btnText="Add Item" />
    ); 
  }
};