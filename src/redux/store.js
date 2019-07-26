import { createStore, applyMiddleware, compose } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { apiClients, apiMiddlewareConfig } from 'src/middleware';
import rootReducer from 'redux/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const middleware = [];

const configureStore = () => {
  if (process.env.NODE_ENV === 'production') {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(
        ...middleware,
        multiClientMiddleware(apiClients, apiMiddlewareConfig)
      )
    );

    return store;
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        ...middleware,
        multiClientMiddleware(apiClients, apiMiddlewareConfig)
      )
    )
  );

  return store;
};

export default configureStore;
