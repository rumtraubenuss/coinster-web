import React, { Component } from 'react';
import { FormattedRelative } from 'react-intl';
import { Button, Well } from 'react-bootstrap';
import cookies from 'js-cookie';

import './PriceList.css';
import DetailPanel from '../detailPanel/DetailPanel';

const cookieNameMinimizedPanels = 'cnstrMinPan';

class PriceList extends Component {
  constructor(props) {
    super(props);

    const cookieMinPanels = cookies.get(cookieNameMinimizedPanels);
    const minimizedPanels = cookieMinPanels ? JSON.parse(cookieMinPanels) : [];

    this.state = {
      prices: {},
      pristine: true,
      loading: false,
      lastReloadDate: undefined,
      minimizedPanels,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let API_URL = '';
    if(process.env.NODE_ENV === 'production') {
      // API_URL = 'http://coinster.projectz.de/prices.json';
      API_URL = 'https://europe-west3-coinster.cloudfunctions.net/api-coinster';
    } else {
      // API_URL = 'http://localhost:8000/api/prices';
      API_URL = 'https://europe-west3-coinster.cloudfunctions.net/api-coinster';
    }
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const newState = {
          prices: json.data,
          loading: false,
          pristine: false,
          lastReloadDate: new Date(),
        };
        this.setState(newState);
      });
  }

  handleClick = () => {
    this.setState({ loading: true });
    this.loadData();
  }

  handleToggleExpand = (type) => {
    const { minimizedPanels: prev } = this.state;
    const next = prev.includes(type) ? prev.filter(val => val !== type) : [...prev, type];
    this.setState({ minimizedPanels: next });
    cookies.set(cookieNameMinimizedPanels, JSON.stringify(next), { expires: 365 });
  }

  render() {
    const { prices, pristine, loading, lastReloadDate } = this.state;
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
    const list = Object.keys(prices).map((type, count) => {
      const { prices, minimizedPanels } = this.state;
      return (
        <DetailPanel
          key={count}
          handleToggleExpand={() => this.handleToggleExpand(type)}
          {...{ prices, type, count, minimizedPanels }}
        />
      )
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
