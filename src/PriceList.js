import React, { Component } from 'react';
import './PriceList.css';
import { FormattedRelative } from 'react-intl';
import { Panel, Button, Well, Grid, Row, Col } from 'react-bootstrap';

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      prices_24: [],
      pristine: true,
      loading: false,
      lastReloadDate: undefined,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let API_URL = '';
    if(process.env.NODE_ENV === 'production') {
      API_URL = 'https://coinster-api.herokuapp.com/api/prices';
    } else {
      API_URL = 'http://localhost:8000/api/prices';
    }
    Promise.all([fetch(API_URL), fetch(API_URL + '?offset=1')])
      .then((promises) => {
        Promise.all(promises.map(data => data.json()))
          .then(([json1, json2]) => {
            const newState = {
              prices: json1,
              prices_24: json2,
              loading: false,
              pristine: false,
              lastReloadDate: new Date(),
            };
            this.setState(newState);
          });
      });
  }

  handleClick = () => {
    this.setState({ loading: true });
    window.setTimeout(this.loadData, 1000);
  }

  render() {
    const { prices, prices_24, pristine, loading, lastReloadDate } = this.state;
    let reload;
    let lastReload = '...';
    const loadButtonLabel = loading ? "Loading..." : "Reload";
    if(!pristine) {
      reload =
        <Button
          onClick={this.handleClick}
          bsStyle="primary"
          bsSize="large"
          block
          disabled={(loading ? true : false)}
        >
          {loadButtonLabel}
        </Button>
    }

    if(lastReloadDate && !loading && !pristine) {
      lastReload =
        <span>
        Last reload was <FormattedRelative value={(lastReloadDate)}/>
        </span>
    }
    const list = prices.map((price, count) => {
      return (
        <Panel key={count} header={price.type}>
          <Grid fluid>
            <Row className="show-grid">
              <Col xs={3}><strong>$ {price.price.toFixed(2)}</strong></Col>
              <Col xs={3}><small>{prices_24[count].date}</small></Col>
              <Col xs={3}><small>24h +0.1%</small></Col>
              <Col xs={3}><small>Reload -0.5%</small></Col>
            </Row>
          </Grid>
        </Panel>
      );
    });
    return (
      <div className="PriceList">
        {list}
        <Well bsSize="small">{lastReload}</Well>
        {reload}
      </div>
    );
  }
}

export default PriceList;
