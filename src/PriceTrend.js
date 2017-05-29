import React from 'react';
import { number } from 'prop-types';
// import classNames from 'classnames';

const PriceTrend = ({ price, priceOld }) => {
  const trendPercent = ((price / priceOld - 1) * 100).toFixed(2);
  const trendDirection = trendPercent >= 0 ? '+' : '';
  let trendClass;
  if(trendPercent >= 0) {
    trendClass = 'text-success';
  } else {
    trendClass = 'text-danger';
  }
  return (
    <small className={trendClass}>{trendDirection}{trendPercent}% </small>
  );
};

PriceTrend.propTypes = {
  price: number.isRequired,
  priceOld: number.isRequired,
};

export default PriceTrend;
