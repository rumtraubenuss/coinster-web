import React from 'react';
import { object, string, func, number, array } from 'prop-types';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Chart from './Chart';
import moment from 'moment';
import PanelHeader from './PanelHeader';
import last from 'ramda/src/last';
import classNames from 'classnames';

const DetailPanel = ({ prices, type, count, handleToggleExpand, minimizedPanels }) => {
  const priceOld = last(prices[type]);
  const price = prices[type][0];
  const trendPercent = ((price.price / priceOld.price - 1) * 100).toFixed(2);
  const trendDirection = trendPercent >= 0 ? '+' : '';
  let trendClass;
  if(trendPercent >= 0) {
    trendClass = 'text-success';
  } else {
    trendClass = 'text-danger';
  }
  const isPanelMinimized = minimizedPanels.includes(type);
  const panelHeaderProps = {
    price,priceType: price.type,
    toggleDetails: handleToggleExpand,
    priceVisible: isPanelMinimized
  };
  const headerItem = <PanelHeader {...panelHeaderProps} />;
  const panelClassNames = classNames({ 'DetailPanel-hidden': isPanelMinimized });
  return (
    <Panel className={panelClassNames} key={count} header={headerItem}>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <strong>{price.price.toFixed('2')} </strong>
            <small className={trendClass}>{trendDirection}{trendPercent}% </small>
            <small>{moment(price.date).calendar()}</small>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Chart values={[...prices[type]].reverse()} />
          </Col>
        </Row>
      </Grid>
    </Panel>
  );
};

DetailPanel.propTypes = {
  prices: object.isRequired,
  type: string.isRequired,
  count: number.isRequired,
  handleToggleExpand: func.isRequired,
  minimizedPanels: array.isRequired,
};

export default DetailPanel;
