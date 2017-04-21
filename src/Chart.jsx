import React from 'react';

const barStyle = {
  display: 'inline-block',
  width: '1px',
  backgroundColor: 'red',
  margin: '0',
  height: '1px',
};
const displayHeight = 50;

const getMaxMin = values => (
  values.reduce((acc, val) => ({
    min: val < acc.min ? val : acc.min || val,
    max: val > acc.max ? val : acc.max || val,
  }), {})
);

const Chart = ({ values = [] }) => {
  const { min, max } = getMaxMin(values.map(val => val.price));
  const coefficient = displayHeight / (max - min);

  const bars = values.map((val, n) => {
    return (
      <div style={{ ...barStyle, marginBottom: `${Math.round((val.price - min) * coefficient)}px` }} key={n}></div>
    );
  });
  return (
    <div>{bars}</div>
  );
};

export default Chart;
