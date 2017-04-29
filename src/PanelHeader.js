import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';

const PanelHeader = ({ priceType, toggleDetails }) => (
  <div>
    <span>{priceType}</span>
    <Glyphicon
      onClick={toggleDetails}
      className="pull-right"
      glyph="menu-down"
    />
  </div>
);

PanelHeader.propTypes = {
  priceType: PropTypes.string.isRequired,
  toggleDetails: PropTypes.func.isRequired,
};

export default PanelHeader;
