import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';

const PanelHeader = ({ price, priceType, toggleDetails, priceVisible = false }) => {
  const priceClassNames = classNames({ hidden: !priceVisible });
  return (
    <div>
      <span>{priceType}</span>
      <span className={priceClassNames}> {price.price.toFixed(2)}</span>
      <Glyphicon
        onClick={toggleDetails}
        className="pull-right"
        glyph="menu-down"
      />
    </div>
  );
};

PanelHeader.propTypes = {
  price: PropTypes.object.isRequired,
  priceType: PropTypes.string.isRequired,
  toggleDetails: PropTypes.func.isRequired,
  priceVisible: PropTypes.bool,
};

export default PanelHeader;
