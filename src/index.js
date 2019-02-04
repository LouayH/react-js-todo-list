import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/w4/app'
import './index.css';
import { Provider } from 'mobx-react'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));