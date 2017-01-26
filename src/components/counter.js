import React, { PropTypes } from 'react';

const Counter = props => {
  return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
        <div className="counter-qty"> {props.qty} </div>
        <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
      </div>
    );
}

Counter.propTypes = {
  onChange: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired
}

export default Counter;