import React, { Component } from 'react';
import './PriceList.css';
import { FormattedRelative } from 'react-intl';

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
    let loader, reload, lastReload;
    if(loading) loader = <p className="PriceList-loading">Loading...</p>;
    if(!pristine && !loading) {
      reload =
        <button onClick={this.handleClick} type="button">Reload</button>
    }
    if(lastReloadDate && !loading) {
      lastReload = <span> Last reload was <FormattedRelative value={(lastReloadDate)}/></span>
    }
    const list = prices.map((price, count) => {
      return (
        <div className="PriceList-item" key={count}>
          <h2 className="PriceList-coin-type">{price.type} </h2>
          <span className="PriceList-price">$ {price.price.toFixed(2)}</span>
        </div>
      );
    });
    return (
      <div>
        {list}
        {reload}
        {loader}
        {lastReload}
      </div>
    );
  }
}

export default PriceList;
