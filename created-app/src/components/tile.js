import React, { PropTypes } from 'react';

import Header from './header.js';
import SearchForm from './search-form.js';

const Tile = props => {
  return (
    <div className="tile">
      <Header title="Tile" />
      <SearchForm onSelect={props.onSelect} />
    </div>);
};

Tile.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Tile;