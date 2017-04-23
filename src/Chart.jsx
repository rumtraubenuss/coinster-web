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
  const graphLines = values.map((val, n) => {
    let posY;
    if (n < values.length - 1) {
      posY = {
        y1: displayHeight - (val.price - min) * coefficient,
        y2: displayHeight - (values[n + 1].price - min) * coefficient,
      };
    }
    return (
      <line
        key={n}
        x1={n}
        x2={n + 1} {...posY}
        style={{stroke: '#333', strokeWidth: 0.2}}
      />
    );
  });
  const graph = (
    <svg
      width="100%"
      height={displayHeight}
      viewBox={`0 0 ${values.length - 1} ${displayHeight}`}
      preserveAspectRatio="none"
      style={{ display: 'block'}}
    >
      {graphLines}
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
