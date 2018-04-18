
/* global fetch */
// import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

import { put, select, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import { actionTypes, loggingIn, loginFailure, loginSuccess } from './actions';
import { selectEmail, selectPassword } from './selectors';

es6promise.polyfill();

function* loginSaga() {
  yield put(loggingIn(true));
  const email = yield select(selectEmail());
  const password = yield select(selectPassword());
  try {
    const res = yield fetch('http://0.0.0.0:5000/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      const token = yield res.json();
      Cookie.set('jwt', token);
      yield put(loginSuccess());
    } else {
      // eslint-disable-next-line no-lonely-if
      if (res.status === 401) {
        yield put(loginFailure('Wrong username/password.'));
      } else {
        yield put(loginFailure(res.statusText));
      }
    }
  } catch (err) {
    yield put(loginFailure('Something went wrong.'));
  }
  yield put(loggingIn(false));
}

function* logoutSaga() {
  yield Cookie.remove('jwt');
}

export const latestLogin = takeLatest(actionTypes.LOGIN, loginSaga);
export const latestLogout = takeLatest(actionTypes.LOGOUT, logoutSaga);
