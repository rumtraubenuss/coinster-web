import React, { Component } from 'react';
import moment from 'moment';

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
    }
  }

  componentDidMount() {
    fetch('https://coinster-api.herokuapp.com/api/prices')
      .then(res => res.json())
      .then(json => { this.setState({ prices: json }) });
  }

  render() {
    const list = this.state.prices.map((price, count) => {
      const date = moment(price.date).calendar();
      return <li key={count}>{price.price_euro} {date}</li>;
    });
    return(
      <ul>{list}</ul>
    );
  }
}

export default PriceList;
