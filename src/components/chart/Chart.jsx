import React from 'react';

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
  let pathString = `M0 ${displayHeight}`;
  values.forEach((val, n) => {
    pathString = pathString.concat(` L${n} ${(displayHeight - (val.price - min) * coefficient).toFixed(0)}`);
  });
  pathString = pathString.concat(` L${values.length - 1} ${displayHeight}`);
  const graph = (
    <svg
      width="100%"
      height={displayHeight}
      viewBox={`0 0 ${values.length - 1} ${displayHeight}`}
      preserveAspectRatio="none"
      style={{ display: 'block'}}
    >
      <path d={pathString} fill="black" fillOpacity="0.2" stroke="black" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
  return (
    <div className="Chart">
      <small className="maxMin">{max.toFixed(2)}</small>
      {graph}
      <small className="maxMin">{min.toFixed(2)}</small>
    </div>
  );
};

export default Chart;
