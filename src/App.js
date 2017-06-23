import React, { Component } from 'react';
import './App.css';
import PriceList from './PriceList';
import LoginForm from './containers/LoginForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PriceList />
        <LoginForm />
      </div>
    );
  }
}

export default App;
