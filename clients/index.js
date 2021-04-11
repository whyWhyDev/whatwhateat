/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application.  Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './store';

render(
  // wrap the App in the Provider and pass in the store
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <h1>hi?</h1>
  </Provider>,
  document.getElementById('root')
);

// render(<App />, document.getElementById('root'));
