import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux/store';
import * as serviceWorker from 'serviceWorker';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes, RenderRoutes } from './routes';

const store = configureStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route history={history}>
        <RenderRoutes routes={Routes} />
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
