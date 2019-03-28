import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import History from './history';

import defaultReducer from './store/reducers/reducer';

import App from './App';

import './assets/stylus/main.styl';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(defaultReducer, composeEnhancers(
  applyMiddleware(thunk),
));

const app = (
  <Provider store={store}>
    <Router history={History}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
