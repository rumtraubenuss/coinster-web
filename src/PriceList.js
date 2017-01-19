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
    let API_URL = '';
    if(process.env.NODE_ENV === 'production') {
      API_URL = 'https://coinster-api.herokuapp.com/api/prices';
    } else {
      API_URL = 'http://localhost:8000/api/prices';
    }
    fetch(API_URL)
      .then(res => res.json())
      .then(json => { this.setState({ prices: json }) });
  }

  render() {
    console.log(moment.locale());
    const list = this.state.prices.map((price, count) => {
      const date = moment(price.date).format('ll H:mm:ss');
      return <li key={count}>{price.price_euro} {date}</li>;
    });
    return(
      <ul>{list}</ul>
    );
  }
}

export default PriceList;
