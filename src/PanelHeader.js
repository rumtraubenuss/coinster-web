import React from 'react';
import { object, string, func, bool } from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';

const PanelHeader = ({ price, priceType, toggleDetails, priceVisible = false }) => {
  const priceClassNames = classNames({ hidden: !priceVisible });
  const iconType = priceVisible ? 'down' : 'up';
  return (
    <div>
      <span>{priceType}</span>
      <span className={priceClassNames}> {price.price.toFixed(2)}</span>
      <Glyphicon
        onClick={toggleDetails}
        className="pull-right"
        glyph={`menu-${iconType}`}
      />
    </div>
  );
};

PanelHeader.propTypes = {
  price: object.isRequired,
  priceType: string.isRequired,
  toggleDetails: func.isRequired,
  priceVisible: bool,
};

export default PanelHeader;
