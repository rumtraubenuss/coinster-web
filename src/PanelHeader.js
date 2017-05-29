import React from 'react';
import { object, string, func, bool } from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import PriceTrend from './PriceTrend';

const PanelHeader = props => {
  const { price,
    priceOld,
    priceType,
    toggleDetails,
    priceVisible = false
  } = props;
  const priceClassNames = classNames({ hidden: !priceVisible });
  const trendClassNames = priceClassNames;
  const iconType = priceVisible ? 'down' : 'up';
  return (
    <div>
      <span>{priceType}</span>
      <span className={priceClassNames}> {price.price.toFixed(2)} </span>
      <span className={trendClassNames}>
        <PriceTrend
          price={price.price}
          priceOld={priceOld.price}
        />
      </span>
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
  priceOld: object.isRequired,
  priceType: string.isRequired,
  toggleDetails: func.isRequired,
  priceVisible: bool,
};

export default PanelHeader;
