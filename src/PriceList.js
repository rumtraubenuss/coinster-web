import React, { Component } from 'react';
import './PriceList.css';
import { FormattedRelative } from 'react-intl';
import { Panel, Button, Well } from 'react-bootstrap';

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
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
      })
      .catch(er => { console.log('Error:', er) });
  }

  handleClick = () => {
    this.setState({ loading: true });
    window.setTimeout(this.loadData, 1000);
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
    const list = prices.map((price, count) => {
      return (
        <Panel key={count} header={price.type} >$ {price.price.toFixed(2)}</Panel>
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
