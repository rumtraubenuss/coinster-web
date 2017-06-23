import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { IntlProvider } from 'react-intl';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <StoreProvider {...{store}}>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </StoreProvider>,
  document.getElementById('root')
);
