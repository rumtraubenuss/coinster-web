import React from 'react';

const barStyle = {
  display: 'inline-block',
  width: '1px',
  backgroundColor: 'red',
  margin: '0',
  height: '10px',
};

const getMaxMin = values => (
  values.reduce((acc, val) => ({
    min: val < acc.min ? val : acc.min || val,
    max: val > acc.max ? val : acc.max || val,
  }), {})
);

const Chart = ({ values = [] }) => {
  console.log(getMaxMin(values.map(val => val.price)));
  const bars = values.map((val, n) => {
    return (
      <div style={{ ...barStyle, height: `${Math.round(val.price / 10)}px` }} key={n}></div>
    );
  });
  return (
    <div>{bars}</div>
  );
};

export default Chart;
