import React, { Component } from 'react';
import './PriceList.css';
import { FormattedRelative } from 'react-intl';
import { Panel, Button, Well, Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';

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
              <Col xs={8}>
                <strong>$ {price.price.toFixed(2)} </strong>
                <small>{moment(price.date).calendar()}</small>
              </Col>
              <Col xs={4}><small>-24h: {prices_24[count].price.toFixed(2)}</small></Col>
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
