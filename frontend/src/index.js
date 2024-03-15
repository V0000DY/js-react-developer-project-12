/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n.js';
import './index.css';

import App from './App';
import store from './slices/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
