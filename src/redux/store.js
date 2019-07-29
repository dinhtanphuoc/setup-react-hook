import { createStore, applyMiddleware, compose } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { apiClients, apiMiddlewareConfig } from 'middleware';
import thunk from 'redux-thunk';
import rootReducer from 'redux/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const middleware = [thunk];
let nextReducer = null;

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

    if (module.hot) {
      module.hot.accept('redux/reducers', () => {
        nextReducer = rootReducer;
        store.replaceReducer(nextReducer);
      });
    }

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

  if (module.hot) {
    module.hot.accept('redux/reducers', () => {
      nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;
