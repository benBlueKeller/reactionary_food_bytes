import React, { PropTypes } from 'react';

const HeaderButton = props => {
  return (
    <div className="stopwatch">
      <button onClick={props.action}> - </button>
    </div>
  );
}

HeaderButton.propTypes = {
  action: PropTypes.func.isRequired
}

export default HeaderButton;