import React, { Component } from 'react';
import './PriceList.css';

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      pristine: true,
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
      .then(json => { this.setState({ prices: json, pristine: false }) });
  }

  handleClick = () => {
    this.setState({ prices: [], pristine: true });
    window.setTimeout(this.loadData, 1000);
  }

  render() {
    const { prices, pristine } = this.state;
    let loader, reload;
    if(pristine) loader = <span className="PriceList-loading">Loading...</span>;
    if(!pristine) reload = <button onClick={this.handleClick} type="button">Reload</button>;
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
        {loader}
        {list}
        <div>
          {reload}
        </div>
      </div>
    );
  }
}

export default PriceList;
