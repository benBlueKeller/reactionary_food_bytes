import React, { Component, PropTypes } from 'react';

export default class TextForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    btnText: PropTypes.string
  };

  static defaultProps = {
    btnText: 'Submit',
  };

  state = {
      input: "",
  };
  
  onInputChange = (e) => {
    this.setState({input: e.target.value});
  };
  
  onSubmit = (e) => {
    e.preventDefault();
  
    this.props.onSubmit(this.state.input);
    this.setState({input: ""});
  };

  render() {
    return (
      <div className="add-item-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.input} onChange={this.onInputChange} />
          <input type="submit" value={this.props.btnText} />
        </form>
      </div>
    ); 
  }
};