import React, { PropTypes } from 'react';

import HeaderButton from './header-button.js';

const Header = props => {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      {props.action ? <HeaderButton action={props.action} /> : <div></div>}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func
};

export default Header;