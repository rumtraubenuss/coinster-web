import React, { Component } from 'react';
import './PriceList.css';
import { FormattedRelative } from 'react-intl';
import { Button, Well } from 'react-bootstrap';
import DetailPanel from './DetailPanel';
import cookies from 'js-cookie';

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
      API_URL = 'https://coinster-api.herokuapp.com/api/prices';
    } else {
      API_URL = 'http://localhost:8000/api/prices';
    }
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const newState = {
          prices: json,
          loading: false,
          pristine: false,
          lastReloadDate: new Date(),
        };
        this.setState(newState);
      });
  }

  handleClick = () => {
    this.setState({ loading: true });
    window.setTimeout(this.loadData, 1000);
  }

  handleToggleExpand = (type) => {
    const { minimizedPanels: prev } = this.state;
    const next = prev.includes(type) ? prev.filter(val => val !== type) : [...prev, type];
    this.setState({ minimizedPanels: next });
    cookies.set(cookieNameMinimizedPanels, JSON.stringify(next));
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
