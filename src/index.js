import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { IntlProvider } from 'react-intl';
import * as reducers from './reducers';
import { createStore, combineReducers } from 'redux';
import { Provider as StoreProvider } from 'react-redux';

const store = createStore(
  combineReducers(reducers),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <StoreProvider {...{store}}>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </StoreProvider>,
  document.getElementById('root')
);
