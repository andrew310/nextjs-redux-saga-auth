// lib/withReduxSaga
import { createStore, combineReducers, applyMiddleware } from 'redux';
import withRedux from 'next-redux-wrapper';
import nextReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import Cookie from 'js-cookie';

import { auth } from './auth/reducers';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const combineLazyReducers = (reducers, initialState) => {
  const reducerKeys = new Set(Object.keys(reducers));
  Object.keys(initialState)
    .filter(k => !reducerKeys.has(k))
    .forEach((k) => {
      // eslint-disable-next-line no-param-reassign, no-confusing-arrow
      reducers[k] = state => state === undefined ? null : state;
    });

  return combineReducers(reducers);
};

const setToken = store => next => (action) => {
  const previousToken = store.getState().token;
  next(action);
  const nextToken = store.getState().token;

  if (nextToken !== previousToken) Cookie.set('jwt', nextToken);
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export function configureStore(defaultState) {
  const token = Cookie.get('jwt');
  const isLoggedIn = token && token.length > 0;
  const initialState = { ...defaultState, ...{ auth: { isLoggedIn } } };
  // initialState.auth.isLoggedIn = isLoggedIn;
  const store = createStore(
    combineLazyReducers({ auth }, initialState),
    initialState,
    bindMiddleware([setToken, sagaMiddleware]),
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

export function withReduxSaga(BaseComponent) {
  return withRedux(configureStore)(nextReduxSaga(BaseComponent));
}
