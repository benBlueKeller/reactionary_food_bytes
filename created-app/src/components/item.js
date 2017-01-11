import React, { PropTypes } from 'react';

import Counter from './counter.js';

const Item = props => {
	return (
		<div className="item">
			<div className="item-name">
				<a className="remove-item" onClick={props.onRemove}>✖</a>
				{props.name}
			</div>
      <div className="item-qty">
        <Counter onChange={props.onChange} qty={props.qty} />
      </div>
		</div>
	);
}

Item.propTypes = {
	name: PropTypes.string.isRequired,
	onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired
};

export default Item;