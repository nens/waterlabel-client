/* globals Promise:true */
import 'babel-polyfill';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import configureStore from './configureStore.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
