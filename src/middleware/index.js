import axios from 'axios';
import { camelizeKeys } from 'humps';
import { getActionTypes } from 'redux-axios-middleware';

export const apiClients = {
  default: {
    client: axios.create({
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 0
      },
      transformResponse: [
        function onConvertResponse(data) {
          if (data) {
            return camelizeKeys(
              typeof data !== 'object' ? JSON.parse(data) : data
            );
          }
          return {};
        }
      ]
    })
  }
};

export const apiMiddlewareConfig = {
  interceptors: {
    request: [
      function onConvertRequest({ getState, dispatch, getSourceAction }, req) {
        return req;
      }
    ]
  },

  onSuccess: ({ action, next, response }, options) => {
    const nextAction = {
      type: getActionTypes(action, options)[0],
      payload: response.data,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  },
  onError: ({ action, next, error, dispatch }, options) => {
    let errorObject;
    if (error && !error.response) {
      errorObject = {
        data: error.message,
        status: 0
      };
      if (process.env.NODE_ENV !== 'production') {
        console.error('HTTP Failure in Axios', error);
      }
    } else {
      errorObject = error.response;
    }
    const nextAction = {
      type: getActionTypes(action, options)[1],
      error: errorObject,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  }
};
